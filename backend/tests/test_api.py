import json
from pathlib import Path

import pytest

from backend.app import DEFAULT_DATASET, create_app


@pytest.fixture()
def client(tmp_path: Path):
    dataset = tmp_path / "records.json"
    records = [
        {
            "record_id": "BM-DEMO-000001", "district": "Dhaka", "upazila": "Savar",
            "mouza_name": "Demo Mouza", "jl_number": "JL-1", "survey_type": "RS",
            "khatian_number": "0012", "dag_number": "0042", "owner_id": "OWN-1",
            "owner_name": "Owner One", "land_area_decimal": "12.5",
            "source_land_area_decimal": "12.5", "area_unit": "decimal",
            "owner_share_percent": "100", "deed_reference": "DEED-1",
            "transfer_date": "2020-01-01", "transfer_sequence_date": "2020-01-01",
            "previous_owner_id": "", "source_document_reference": "DOC-1",
            "source_owner_name": "Owner One", "required_field_missing": "",
            "duplicate_test_key": "", "record_source": "SYNTHETIC_DEMO",
            "expected_status": "STRONG", "expected_issue": "NONE",
            "demo_explanation": "",
        },
        {
            "record_id": "BM-DEMO-000002", "district": "Dhaka", "upazila": "Savar",
            "mouza_name": "Demo Mouza", "jl_number": "JL-1", "survey_type": "RS",
            "khatian_number": "0013", "dag_number": "0043", "owner_id": "OWN-2",
            "owner_name": "Owner Two", "land_area_decimal": "10",
            "source_land_area_decimal": "11", "area_unit": "decimal",
            "owner_share_percent": "100", "deed_reference": "DEED-2",
            "transfer_date": "2020-01-01", "transfer_sequence_date": "2020-01-01",
            "previous_owner_id": "", "source_document_reference": "DOC-2",
            "source_owner_name": "Owner Two", "required_field_missing": "",
            "duplicate_test_key": "", "record_source": "SYNTHETIC_DEMO",
            "expected_status": "STRONG", "expected_issue": "NONE",
            "demo_explanation": "",
        },
    ]
    dataset.write_text(json.dumps(records), encoding="utf-8")
    app = create_app({"TESTING": True, "DATASET_PATH": str(dataset)})
    return app.test_client()


def test_health_reports_demo_source_and_count(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json["dataset"] == "curated_demo"
    assert response.json["recordCount"] == 2
    assert response.json["officialRegistryConnected"] is False


def test_bundled_demo_scenarios_are_available():
    client = create_app({
        "TESTING": True,
        "DATASET_PATH": str(DEFAULT_DATASET),
    }).test_client()

    response = client.get("/records")
    assert response.status_code == 200
    assert response.json["total"] == 5
    assert response.json["records"][1]["record_id"] == "BM-DEMO-000002"

    record_response = client.get("/records/BM-DEMO-000002")
    assert record_response.status_code == 200
    assert record_response.json["source"] == "BhumiMitro curated demo scenarios"


def test_record_search_supports_pagination_and_stats(client):
    response = client.get("/records?q=Owner&page=1&limit=1")
    assert response.status_code == 200
    assert response.json["total"] == 2
    assert len(response.json["records"]) == 1
    assert response.json["stats"]["total"] == 2


def test_verification_requires_match_and_does_not_trust_expected_status(client):
    response = client.post("/verify", json={"recordId": "BM-DEMO-000001"})
    assert response.status_code == 200
    record = response.json["record"]
    assert record["status"] == "weak"
    assert record["ownershipHistory"][0]["basis"] == "unknown_basis"
    assert record["ownershipHistory"][0]["isChainIntact"] is False
    assert any(
        finding["titleEn"] == "Insufficient evidence to establish a title chain"
        for finding in record["findings"]
    )
    assert record["charLandDetails"]["isCharLand"] is None
    assert record["charLandDetails"]["charStatus"] == "unavailable"
    assert record["mortgageStatus"]["isMortgaged"] is None
    assert record["mortgageStatus"]["isLockedAgainstSecondMortgage"] is None


def test_verification_finds_actual_area_difference(client):
    response = client.post("/verify", json={
        "district": "Dhaka", "upazila": "Savar",
        "dagNo": "43", "khatianNo": "13",
    })
    assert response.status_code == 200
    assert "AREA_VALUE_MISMATCH" in response.json["record"]["summaryEn"]
    assert response.json["record"]["parcelDetails"]["areaDecimals"] == 10


def test_verification_uses_a_unique_dag_khatian_when_suggested_location_differs(client):
    response = client.post("/verify", json={
        "district": "a different suggestion",
        "upazila": "another suggestion",
        "dagNo": "42",
        "khatianNo": "12",
    })
    assert response.status_code == 200
    assert response.json["record"]["id"] == "BM-DEMO-000001"


def test_unknown_record_is_not_replaced_with_a_fixture(client):
    response = client.get("/records/does-not-exist")
    assert response.status_code == 404


def test_qr_endpoint_does_not_claim_unsigned_demo_data_is_valid(client):
    response = client.post("/qr-verify", json={"code": "BM-DEMO-000001"})
    assert response.status_code == 200
    assert response.json["isValidSignature"] is False
    assert response.json["tamperDetected"] is False


def test_invalid_json_is_rejected(client):
    response = client.post("/verify", data="[]", content_type="application/json")
    assert response.status_code == 400
