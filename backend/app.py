import json
import math
import os
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS


PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DATASET = PROJECT_ROOT / "data" / "demo_records.json"
REQUIRED_COLUMNS = {
    "record_id",
    "district",
    "upazila",
    "mouza_name",
    "jl_number",
    "survey_type",
    "khatian_number",
    "dag_number",
    "owner_id",
    "owner_name",
    "land_area_decimal",
    "source_land_area_decimal",
    "area_unit",
    "owner_share_percent",
    "deed_reference",
    "transfer_date",
    "transfer_sequence_date",
    "previous_owner_id",
    "source_document_reference",
    "source_owner_name",
    "required_field_missing",
    "duplicate_test_key",
    "record_source",
    "expected_status",
    "expected_issue",
    "demo_explanation",
}
CRITICAL_SEEDED_ISSUES = {
    "DUPLICATE_DEED_REFERENCE",
    "DUPLICATE_DAG_KHATIAN",
    "MISSING_PREVIOUS_OWNER_LINK",
    "OWNER_LINK_NOT_FOUND",
    "TRANSFER_ORDER_CONFLICT",
}
ISSUE_TITLES = {
    "AREA_MISMATCH": ("Area values differ", "জমির পরিমাণে অমিল"),
    "NAME_VARIATION": ("Owner-name variation requires review", "মালিকের নামের পার্থক্য পর্যালোচনা প্রয়োজন"),
    "DUPLICATE_DEED_REFERENCE": ("Duplicate deed reference in synthetic dataset", "সিন্থেটিক ডেটাসেটে দলিল রেফারেন্স পুনরাবৃত্ত"),
    "MISSING_PREVIOUS_OWNER_LINK": ("Previous-owner link is absent", "পূর্বতন মালিকের সংযোগ অনুপস্থিত"),
    "TRANSFER_DATE_ANOMALY": ("Transfer date values conflict", "হস্তান্তরের তারিখে অমিল"),
    "DUPLICATE_DAG_KHATIAN": ("Duplicate dag-khatian key in synthetic dataset", "সিন্থেটিক ডেটাসেটে দাগ-খতিয়ান কী পুনরাবৃত্ত"),
    "SHARE_TOTAL_MISMATCH": ("Recorded owner share is not 100%", "নথিভুক্ত মালিকের হিস্যা ১০০% নয়"),
    "MISSING_DEED_REFERENCE": ("Deed reference is missing", "দলিলের রেফারেন্স অনুপস্থিত"),
    "MISSING_SOURCE_DOCUMENT": ("Supporting document reference is missing", "সহায়ক নথির রেফারেন্স অনুপস্থিত"),
    "OWNER_LINK_NOT_FOUND": ("Previous owner ID does not resolve in this dataset", "পূর্বতন মালিকের আইডি এই ডেটাসেটে মেলেনি"),
    "AREA_UNIT_MISMATCH": ("Area unit is not comparable", "জমির পরিমাপের একক তুলনাযোগ্য নয়"),
    "INCOMPLETE_RECORD": ("Required record fields are missing", "প্রয়োজনীয় রেকর্ড তথ্য অনুপস্থিত"),
    "TRANSFER_ORDER_CONFLICT": ("Transfer dates are inconsistent", "হস্তান্তরের তারিখে অসঙ্গতি"),
    "INSUFFICIENT_TITLE_CHAIN_DATA": ("Insufficient evidence to establish a title chain", "মালিকানা ধারাবাহিকতা প্রতিষ্ঠার জন্য তথ্য অপর্যাপ্ত"),
    "DUPLICATE_DAG_KHATIAN_KEY": ("Duplicate dag-khatian key in synthetic dataset", "সিন্থেটিক ডেটাসেটে দাগ-খতিয়ান কী পুনরাবৃত্ত"),
    "AREA_VALUE_MISMATCH": ("Area values differ", "জমির পরিমাণে অমিল"),
    "OWNER_NAME_VARIATION": ("Owner-name variation requires review", "মালিকের নামের পার্থক্য পর্যালোচনা প্রয়োজন"),
    "SHARE_MISMATCH": ("Recorded owner share is not 100%", "নথিভুক্ত মালিকের হিস্যা ১০০% নয়"),
    "DEED_REFERENCE_MISSING": ("Deed reference is missing", "দলিলের রেফারেন্স অনুপস্থিত"),
    "SOURCE_DOCUMENT_MISSING": ("Supporting document reference is missing", "সহায়ক নথির রেফারেন্স অনুপস্থিত"),
}


class DatasetError(RuntimeError):
    pass


@lru_cache(maxsize=4)
def _read_dataset(path_text: str, modified_ns: int) -> tuple[dict[str, str], ...]:
    del modified_ns
    path = Path(path_text)
    if not path.is_file():
        raise DatasetError(f"Demo records file not found: {path}")
    try:
        with path.open(encoding="utf-8") as stream:
            records = json.load(stream)
    except (OSError, UnicodeError, json.JSONDecodeError) as exc:
        raise DatasetError(f"Unable to read demo records: {exc}") from exc
    if not isinstance(records, list) or any(not isinstance(row, dict) for row in records):
        raise DatasetError("Demo records must be a JSON array of objects")
    normalized = tuple(
        {str(key): str(value).strip() if value is not None else "" for key, value in row.items()}
        for row in records
    )
    for index, row in enumerate(normalized, start=1):
        missing = sorted(REQUIRED_COLUMNS.difference(row))
        if missing:
            raise DatasetError(
                f"Demo record {index} is missing required fields: {', '.join(missing)}"
            )
    return normalized


def load_records(dataset_path: str | Path) -> list[dict[str, str]]:
    path = Path(dataset_path).expanduser().resolve()
    try:
        modified_ns = path.stat().st_mtime_ns
    except OSError:
        modified_ns = 0
    return list(_read_dataset(str(path), modified_ns))


def _number(value: str) -> float | None:
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    return number if math.isfinite(number) else None


def _normalized_number(value: str) -> str:
    return value.strip().lstrip("0") or "0"


def _issue_finding(
    row: dict[str, str], code: str, severity: str, index: int
) -> dict[str, Any]:
    title_en, title_bn = ISSUE_TITLES.get(
        code, (code.replace("_", " ").title(), row.get("demo_explanation", "") or "রেকর্ডে পর্যালোচনাযোগ্য তথ্য রয়েছে।")
    )
    description_en = row.get("demo_explanation", "") or (
        "The available synthetic record indicates a discrepancy that needs review."
    )
    description_bn = row.get("demo_explanation", "") or title_bn
    refs = [f"Record ID: {row.get('record_id', '')}"]
    for label, field in (
        ("Dag", "dag_number"),
        ("Khatian", "khatian_number"),
        ("Deed reference", "deed_reference"),
        ("Source document reference", "source_document_reference"),
    ):
        value = row.get(field, "")
        if value:
            refs.append(f"{label}: {value}")
    return {
        "id": f"{row.get('record_id', 'record')}-finding-{index}",
        "category": "chain_of_title" if code in {
            "INSUFFICIENT_TITLE_CHAIN_DATA",
            "MISSING_PREVIOUS_OWNER_LINK",
            "OWNER_LINK_NOT_FOUND",
            "TRANSFER_ORDER_CONFLICT",
        } else "survey_consistency" if code in {"AREA_MISMATCH", "AREA_VALUE_MISMATCH", "AREA_UNIT_MISMATCH"} else "multi_office_discrepancy",
        "severity": severity,
        "titleEn": title_en,
        "titleBn": title_bn,
        "descriptionEn": description_en,
        "descriptionBn": description_bn,
        "evidenceRefs": refs,
        "sourceRecord": f"Demo record {row.get('record_id', '')}",
    }


def _seeded_issue(row: dict[str, str], all_rows: list[dict[str, str]]) -> str | None:
    issue = row.get("expected_issue", "").strip().upper()
    if issue and issue != "NONE":
        if issue == "DUPLICATE_DEED_REFERENCE":
            deed = row.get("deed_reference", "").strip()
            if deed and sum(candidate.get("deed_reference", "").strip() == deed for candidate in all_rows) > 1:
                return issue
        elif issue == "DUPLICATE_DAG_KHATIAN":
            duplicate_key = row.get("duplicate_test_key", "").strip()
            if duplicate_key and sum(
                candidate.get("duplicate_test_key", "").strip() == duplicate_key
                for candidate in all_rows
            ) > 1:
                return issue
        elif issue == "OWNER_LINK_NOT_FOUND":
            predecessor = row.get("previous_owner_id", "").strip()
            if predecessor and not any(candidate.get("owner_id") == predecessor for candidate in all_rows):
                return issue
        else:
            return issue
    return None


def assess_record(row: dict[str, str], all_rows: list[dict[str, str]]) -> dict[str, Any]:
    issues: list[tuple[str, str]] = []
    seeded = _seeded_issue(row, all_rows)
    if seeded:
        severity = "critical" if seeded in CRITICAL_SEEDED_ISSUES else "warning"
        issues.append((seeded, severity))

    area = _number(row.get("land_area_decimal", ""))
    source_area = _number(row.get("source_land_area_decimal", ""))
    if area is not None and source_area is not None and abs(area - source_area) > 0.01:
        if not any(code in {"AREA_MISMATCH", "AREA_VALUE_MISMATCH"} for code, _ in issues):
            issues.append(("AREA_VALUE_MISMATCH", "warning"))

    owner_name = row.get("owner_name", "").strip()
    source_owner = row.get("source_owner_name", "").strip()
    if owner_name and source_owner and owner_name.casefold() != source_owner.casefold():
        if not any(code in {"NAME_VARIATION", "OWNER_NAME_VARIATION"} for code, _ in issues):
            issues.append(("OWNER_NAME_VARIATION", "advisory"))

    share = _number(row.get("owner_share_percent", ""))
    if share is not None and abs(share - 100) > 0.01 and not any(
        code in {"SHARE_TOTAL_MISMATCH", "SHARE_MISMATCH"} for code, _ in issues
    ):
        issues.append(("SHARE_MISMATCH", "warning"))

    if not row.get("deed_reference", "").strip() and not any(
        code in {"MISSING_DEED_REFERENCE", "DEED_REFERENCE_MISSING"} for code, _ in issues
    ):
        issues.append(("DEED_REFERENCE_MISSING", "warning"))
    if not row.get("source_document_reference", "").strip() and not any(
        code in {"MISSING_SOURCE_DOCUMENT", "SOURCE_DOCUMENT_MISSING"} for code, _ in issues
    ):
        issues.append(("SOURCE_DOCUMENT_MISSING", "warning"))

    issues.append(("INSUFFICIENT_TITLE_CHAIN_DATA", "warning"))
    findings = [
        _issue_finding(row, code, severity, index)
        for index, (code, severity) in enumerate(issues, start=1)
    ]
    status = "broken" if any(severity == "critical" for _, severity in issues) else "weak"
    return {
        "status": status,
        "issues": [code for code, _ in issues],
        "findings": findings,
    }


def _display(value: str) -> str:
    return value if value else "Not provided in this demo"


def to_verification_record(row: dict[str, str], all_rows: list[dict[str, str]]) -> dict[str, Any]:
    assessment = assess_record(row, all_rows)
    area = _number(row.get("land_area_decimal", ""))
    source_area = _number(row.get("source_land_area_decimal", ""))
    transfer_date = row.get("transfer_date", "")
    generated_at = datetime.now(timezone.utc).isoformat()
    record_id = row.get("record_id", "")
    owner = _display(row.get("owner_name", ""))
    issue_summary = ", ".join(assessment["issues"])
    return {
        "id": record_id,
        "trackingCode": record_id,
        "timestamp": generated_at,
        "status": assessment["status"],
        "summaryEn": (
            "Synthetic record assessed for internal consistency only. No official registry "
            f"was queried. Findings: {issue_summary}."
        ),
        "summaryBn": (
            "শুধু সিন্থেটিক রেকর্ডের অভ্যন্তরীণ সামঞ্জস্য পর্যালোচনা করা হয়েছে; কোনো সরকারি "
            f"রেজিস্ট্রি যাচাই করা হয়নি। পর্যবেক্ষণ: {issue_summary}।"
        ),
        "claimantNameEn": owner,
        "claimantNameBn": owner,
        "claimantNidMasked": None,
        "parcelDetails": {
            "division": "Not provided in this demo",
            "district": _display(row.get("district", "")),
            "upazila": _display(row.get("upazila", "")),
            "mouza": _display(row.get("mouza_name", "")),
            "jlNo": _display(row.get("jl_number", "")),
            "dagNo": _display(row.get("dag_number", "")),
            "khatianNo": _display(row.get("khatian_number", "")),
            "surveyType": row.get("survey_type") or "RS",
            "landClassEn": "Not provided in this demo",
            "landClassBn": "ডেমো রেকর্ডে নেই",
            "areaDecimals": area,
            "areaAcres": round(area / 100, 3) if area is not None else None,
            "isVestedProperty": None,
            "isKhasLand": None,
        },
        "findings": assessment["findings"],
        "missingChecklistEn": [
            "Obtain certified survey records and compare the relevant dag and khatian.",
            "Obtain the registered deed and verify its details with the Sub-Registry Office.",
            "Obtain predecessor deeds or applicable inheritance/court/government-settlement evidence.",
            "Confirm mutation, land-tax, encumbrance, and government-status records with the competent offices.",
        ],
        "missingChecklistBn": [
            "সংশ্লিষ্ট দাগ ও খতিয়ান মিলিয়ে প্রত্যয়িত জরিপ রেকর্ড সংগ্রহ করুন।",
            "নিবন্ধিত দলিল সংগ্রহ করে সাব-রেজিস্ট্রি অফিসে তথ্য যাচাই করুন।",
            "পূর্ববর্তী দলিল অথবা প্রযোজ্য উত্তরাধিকার/আদালত/সরকারি বন্দোবস্তের প্রমাণ সংগ্রহ করুন।",
            "সংশ্লিষ্ট অফিসে নামজারি, ভূমি কর, দায় এবং সরকারি-স্থিতির রেকর্ড যাচাই করুন।",
        ],
        "recommendedStepsEn": [
            "Treat this result as a screening aid, not a legal ownership decision.",
            "Have a Bangladesh land lawyer inspect certified primary documents and the full chain.",
        ],
        "recommendedStepsBn": [
            "এই ফলাফলকে প্রাথমিক বাছাই হিসেবে দেখুন, আইনি মালিকানার সিদ্ধান্ত হিসেবে নয়।",
            "বাংলাদেশের ভূমি-আইনজীবীর মাধ্যমে প্রত্যয়িত মূল নথি ও সম্পূর্ণ ধারাবাহিকতা পরীক্ষা করান।",
        ],
        "titleRepairPath": [],
        "multiOfficeRecords": {
            "subRegistry": {
                "deedNo": _display(row.get("deed_reference", "")),
                "deedDate": _display(transfer_date),
                "recordedOwnerBn": owner,
                "recordedOwnerEn": owner,
                "dagNo": _display(row.get("dag_number", "")),
                "areaDecimals": area,
                "status": "pending",
            },
            "acLand": {
                "mutationCaseNo": "Not provided in this demo",
                "register9Volume": "Not provided in this demo",
                "recordedOwnerBn": "Not provided in this demo",
                "recordedOwnerEn": "Not provided in this demo",
                "dagNo": _display(row.get("dag_number", "")),
                "areaDecimals": source_area,
                "dakhilaYear": "Not provided in this demo",
                "status": "pending",
            },
            "dlrs": {
                "surveyKhatianNo": _display(row.get("khatian_number", "")),
                "surveyType": _display(row.get("survey_type", "")),
                "recordedOwnerBn": _display(row.get("source_owner_name", "")),
                "recordedOwnerEn": _display(row.get("source_owner_name", "")),
                "dagNo": _display(row.get("dag_number", "")),
                "areaDecimals": source_area,
                "mapSheetNo": "Not provided in this demo",
                "status": "mismatch" if source_area is not None and area is not None and abs(source_area - area) > 0.01 else "unverified",
            },
            "discrepancies": [
                {
                    "field": code,
                    "descriptionBn": row.get("demo_explanation", "") or finding["titleBn"],
                    "descriptionEn": finding["titleEn"],
                    "severity": "critical" if finding["severity"] == "critical" else "warning",
                }
                for code, finding in zip(assessment["issues"], assessment["findings"])
            ],
        },
        "charLandDetails": {
            "isCharLand": None,
            "charStatus": "unavailable",
            "explanationBn": "ডেমো রেকর্ডে চর/খাস/বন্দোবস্তের নির্ভরযোগ্য তথ্য নেই; জমির শ্রেণি নির্ধারণ করা হয়নি।",
            "explanationEn": "The demo record lacks authoritative char/khas/settlement fields; land classification was not determined.",
        },
        "mortgageStatus": {
            "isMortgaged": None,
            "isLockedAgainstSecondMortgage": None,
            "warningBn": "ডেমো রেকর্ডে বন্ধক-সংক্রান্ত তথ্য নেই; সংশ্লিষ্ট অফিস/আর্থিক প্রতিষ্ঠানে যাচাই করুন।",
            "warningEn": "Mortgage data is not included in this demo; check with the relevant office and financial institutions.",
        },
        "ownershipHistory": [
            {
                "id": f"{record_id}-claim",
                "order": 1,
                "year": transfer_date[:4] if len(transfer_date) >= 4 else "Unknown",
                "date": transfer_date or None,
                "fromPartyEn": "Unknown; predecessor and transfer basis are not established by this demo",
                "fromPartyBn": "অজানা; এই ডেমোতে পূর্বতন মালিক ও হস্তান্তরের ভিত্তি প্রতিষ্ঠিত নয়",
                "toPartyEn": owner,
                "toPartyBn": owner,
                "transferTypeEn": "Recorded claim only; supporting legal basis not established",
                "transferTypeBn": "শুধু নথিভুক্ত দাবি; সহায়ক আইনি ভিত্তি প্রতিষ্ঠিত নয়",
                "basis": "unknown_basis",
                "deedNumber": row.get("deed_reference") or None,
                "shareTransferred": row.get("owner_share_percent") or "Unknown",
                "sharePercentage": _number(row.get("owner_share_percent", "")),
                "isChainIntact": False,
                "notesEn": "This demo does not provide a complete ownership-transfer timeline.",
                "notesBn": "এই ডেমোতে সম্পূর্ণ মালিকানা হস্তান্তরের সময়রেখা নেই।",
                "flag": "unverified_warishan",
            }
        ],
        "qrSignatureData": {
            "reportHash": "",
            "signerPublicKeyId": "NO_SIGNATURE",
            "signedAt": "",
            "verificationStatus": "invalid",
            "signatureHex": "",
            "algorithm": "none",
        },
        "isSynthetic": True,
        "dataSourceLabelEn": "Illustrative demo data; no government records queried",
        "dataSourceLabelBn": "উদাহরণভিত্তিক ডেমো ডেটা; কোনো সরকারি রেকর্ড যাচাই করা হয়নি",
    }


def _search_matches(row: dict[str, str], query: str) -> bool:
    if not query:
        return True
    folded = query.casefold()
    return any(folded in row.get(field, "").casefold() for field in (
        "record_id", "district", "upazila", "mouza_name", "khatian_number",
        "dag_number", "owner_name", "deed_reference",
    ))


def create_app(test_config: dict[str, Any] | None = None) -> Flask:
    app = Flask(__name__)
    app.config.update(
        DATASET_PATH=os.environ.get("BHUMIMITRO_DEMO_DATA_PATH", str(DEFAULT_DATASET)),
        CORS_ORIGINS=os.environ.get("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"),
    )
    if test_config:
        app.config.update(test_config)

    origins = [
        origin.strip()
        for origin in str(app.config["CORS_ORIGINS"]).split(",")
        if origin.strip()
    ]
    CORS(app, resources={r"/*": {"origins": origins}})

    def dataset() -> list[dict[str, str]]:
        try:
            return load_records(app.config["DATASET_PATH"])
        except DatasetError as exc:
            raise DatasetError(str(exc)) from exc

    @app.errorhandler(DatasetError)
    def handle_dataset_error(error: DatasetError):
        app.logger.error("Dataset unavailable: %s", error)
        return jsonify({"error": str(error), "code": "dataset_unavailable"}), 503

    @app.get("/health")
    def health():
        try:
            count = len(dataset())
        except DatasetError as exc:
            return jsonify({"status": "error", "dataset": "unavailable", "error": str(exc)}), 503
        return jsonify({
            "status": "ok",
            "dataset": "curated_demo",
            "recordCount": count,
            "officialRegistryConnected": False,
        })

    @app.get("/records")
    def records():
        rows = dataset()
        query = request.args.get("q", request.args.get("query", "")).strip()
        status_filter = request.args.get("status", "").strip().lower()
        issue_filter = request.args.get("issue", "").strip().upper()
        district_filter = request.args.get("district", "").strip().casefold()
        try:
            page = max(1, int(request.args.get("page", "1")))
            limit = min(100, max(1, int(request.args.get("limit", "20"))))
        except ValueError:
            return jsonify({"error": "page and limit must be integers"}), 400

        assessment_by_id = {
            row["record_id"]: assess_record(row, rows)
            for row in rows
        }
        matched = [
            row for row in rows
            if _search_matches(row, query)
            and (not district_filter or district_filter in row.get("district", "").casefold())
            and (not status_filter or status_filter == "all" or assessment_by_id[row["record_id"]]["status"] == status_filter)
            and (not issue_filter or issue_filter == "ALL" or issue_filter in assessment_by_id[row["record_id"]]["issues"])
        ]
        start = (page - 1) * limit
        stats = {
            "total": len(rows),
            "strong": sum(assessment_by_id[row["record_id"]]["status"] == "strong" for row in rows),
            "weak": sum(assessment_by_id[row["record_id"]]["status"] == "weak" for row in rows),
            "broken": sum(assessment_by_id[row["record_id"]]["status"] == "broken" for row in rows),
        }
        page_records = []
        for row in matched[start:start + limit]:
            summary = assessment_by_id[row["record_id"]]
            page_records.append({
                **row,
                "assessment_status": summary["status"].upper(),
                "assessment_issues": summary["issues"],
            })
        return jsonify({
            "records": page_records,
            "total": len(matched),
            "page": page,
            "totalPages": max(1, (len(matched) + limit - 1) // limit),
            "stats": stats,
        })

    @app.get("/records/<record_id>")
    def get_record(record_id: str):
        rows = dataset()
        row = next((item for item in rows if item["record_id"].casefold() == record_id.casefold()), None)
        if row is None:
            return jsonify({"error": "Record not found", "code": "record_not_found"}), 404
        return jsonify({
            "record": to_verification_record(row, rows),
            "isSynthetic": True,
            "source": "BhumiMitro curated demo scenarios",
        })

    @app.post("/verify")
    def verify():
        body = request.get_json(silent=True)
        if not isinstance(body, dict):
            return jsonify({"error": "A JSON object is required"}), 400
        rows = dataset()
        record_id = str(body.get("recordId", "")).strip()
        if record_id:
            matched = next((row for row in rows if row["record_id"].casefold() == record_id.casefold()), None)
        else:
            required = ("dagNo", "khatianNo")
            missing = [field for field in required if not str(body.get(field, "")).strip()]
            if missing:
                return jsonify({"error": f"Missing required parcel identifiers: {', '.join(missing)}"}), 400
            district = str(body.get("district", "")).strip().casefold()
            upazila = str(body.get("upazila", "")).strip().casefold()
            dag = _normalized_number(str(body["dagNo"]))
            khatian = _normalized_number(str(body["khatianNo"]))
            candidates = [
                row for row in rows
                if _normalized_number(row["dag_number"]) == dag
                and _normalized_number(row["khatian_number"]) == khatian
            ]
            location_matches = [
                row for row in candidates
                if (not district or row["district"].casefold() == district)
                and (not upazila or row["upazila"].casefold() == upazila)
            ]
            if location_matches:
                candidates = location_matches
            if len(candidates) > 1:
                return jsonify({
                    "error": "Dag and khatian match multiple synthetic records; refine the location or use recordId.",
                    "code": "ambiguous_record",
                    "candidateRecordIds": [row["record_id"] for row in candidates[:20]],
                }), 409
            matched = candidates[0] if candidates else None
        if matched is None:
            return jsonify({"error": "No matching synthetic demo record was found", "code": "record_not_found"}), 404
        return jsonify({
            "record": to_verification_record(matched, rows),
            "isSynthetic": True,
            "source": "BhumiMitro curated demo scenarios",
        })

    @app.post("/qr-verify")
    def qr_verify():
        body = request.get_json(silent=True)
        code = str(body.get("code", "")).strip() if isinstance(body, dict) else ""
        if not code:
            return jsonify({"error": "Verification code or hash required"}), 400
        return jsonify({
            "isValidSignature": False,
            "signerAuthorityEn": "No signing authority configured",
            "signerAuthorityBn": "কোনো স্বাক্ষরকারী কর্তৃপক্ষ কনফিগার করা নেই",
            "keyId": "NO_SIGNATURE",
            "signedTimestamp": "N/A",
            "documentTrackingCode": code,
            "parcelSummary": "No signed report associated with this code",
            "integrityNoticeEn": "This demo dataset has no cryptographic signatures. Integrity and signature cannot be verified.",
            "integrityNoticeBn": "এই ডেমো ডেটাসেটে কোনো ক্রিপ্টোগ্রাফিক স্বাক্ষর নেই। অখণ্ডতা বা স্বাক্ষর যাচাই করা সম্ভব নয়।",
            "legalOwnershipDisclaimerEn": "This API does not verify legal ownership or official government records.",
            "legalOwnershipDisclaimerBn": "এই API আইনি মালিকানা বা সরকারি রেকর্ড যাচাই করে না।",
            "tamperDetected": False,
        })

    return app


app = create_app()

if __name__ == "__main__":
    app.run(
        host=os.environ.get("FLASK_HOST", "127.0.0.1"),
        port=int(os.environ.get("FLASK_PORT", "5000")),
        debug=os.environ.get("FLASK_DEBUG", "false").lower() == "true",
    )
