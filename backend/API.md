# Demo REST API

Base URL: `http://127.0.0.1:5000`

All responses use JSON. Record and assessment responses are synthetic demo output. No endpoint accesses official government records.

## `GET /health`

Returns service and dataset status:

```json
{
  "status": "ok",
  "dataset": "curated_demo",
  "recordCount": 5,
  "officialRegistryConnected": false
}
```

A missing, unreadable, or incompatible JSON scenario file returns `503` with `code: "dataset_unavailable"`. By default, the service loads `data/demo_records.json`.

## `GET /records`

Query parameters: `q`/`query`, `status` (`weak` or `broken` in the current rule set), `issue`, `district`, `page` (1-based), and `limit` (1–100).

Returns `{ records, total, page, totalPages, stats }`. Each record contains the scenario fields plus `assessment_status` and `assessment_issues` computed by the engine. `stats` reports the engine's assessment counts; the demo `expected_status` field is not used.

## `GET /records/{record_id}`

Returns the converted advisory record:

```json
{
  "record": { "id": "BM-DEMO-000001", "status": "weak", "isSynthetic": true },
  "isSynthetic": true,
  "source": "BhumiMitro curated demo scenarios"
}
```

Unknown IDs return `404`, not a reference or fallback record.

## `POST /verify`

Either provide `recordId`, or `dagNo` and `khatianNo` (district and upazila are optional narrowing fields). Dag and khatian numbers are matched with leading zeroes normalized. If the supplied location fields do not match a unique pair, the service uses the unique dag-khatian pair; ambiguous matches return `409` with candidate synthetic IDs. Unmatched parcels return `404`; invalid or incomplete requests return `400`.

The response shape is `{ record, isSynthetic, source }`. The record includes findings and a checklist of evidence not represented in the demo; it does not generate a legal repair path. Since one scenario cannot establish a chain of title, an insufficient-chain finding is always included and the assessment cannot be `strong`.

## `POST /qr-verify`

Request: `{ "code": "..." }`. The API currently returns `isValidSignature: false` for any code because the demo data has no cryptographic signatures. `tamperDetected` remains false unless an actual signed payload is implemented and compared; an unsigned record is not proof of tampering.

## CORS and exposure

`CORS_ORIGINS` accepts a comma-separated allowlist. Defaults allow local Next.js development origins. Keep the production list limited to trusted frontend origins. The API currently has no authentication or role-restricted actions and should not be exposed as an administrative production service.
