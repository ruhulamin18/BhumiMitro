# Demo scenario mapping

The application uses the five hand-curated examples in `data/demo_records.json`. They are fictional scenarios designed to demonstrate a clean-looking record with incomplete evidence, area and name variations, a missing predecessor link, and a duplicate deed reference. They do not originate from a government registry or real person's land record.

| Fields | Application use | Limitations |
|---|---|---|
| `record_id` | Demo tracking identifier | Illustrative identifier only |
| `district`, `upazila`, `mouza_name`, `jl_number` | Search and parcel summary | Not an authoritative administrative or cadastral lookup |
| `survey_type`, `khatian_number`, `dag_number` | Demo parcel identifiers | No verified survey series or official parcel match |
| `owner_id`, `owner_name`, `source_owner_name` | Name-variation scenario | Fictional values, not identity evidence |
| `land_area_decimal`, `source_land_area_decimal`, `area_unit` | Area-comparison scenario | Illustrative values; not a map measurement or certified survey |
| `owner_share_percent` | Share completeness screening | No co-owner ledger or heir-share allocation evidence |
| `deed_reference`, `transfer_date`, `source_document_reference` | Presence checks and demo references | No deed images, certified extracts, signatures, or document contents |
| `previous_owner_id`, `transfer_sequence_date` | Limited predecessor-link/date screening | Not a complete ordered transfer history or legal basis |
| `duplicate_test_key`, `required_field_missing`, `expected_issue`, `expected_status`, `demo_explanation` | Assessment scenario and explanatory text | Demo setup only; `expected_status` is not used to determine assessment results |
| `record_source` | Identifies illustrative scenario provenance | Does not indicate an official source |

## Unsupported information

The demo records do not include verified transfer basis, full ownership chains, mutation status, tax receipts, khas/vested-property status, char-land restoration or settlement evidence, government-record comparisons, mortgage/encumbrance data, court disputes, plot coordinates, signed payloads, or a server-side review/audit history. These fields remain unavailable or unverified in the interface; they are not fabricated.

Every scenario receives an insufficient-title-chain finding because a single illustrative record cannot establish the legal basis or completeness of ownership transfers. Results are advisory examples only and must not be interpreted as real parcel verification, fraud detection, or legal advice.
