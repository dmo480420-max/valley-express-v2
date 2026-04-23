# 📄 Document Automator (Powered by Stirling PDF)

## Tactical Role: Compliance & Document Specialist
The Document Automator is the "Secretariat" of the Valley Express Logistics suite. It handles the high-volume manipulation of logistics documents (Bills of Lading, Rate Sheets, Carrier Contracts) using the robust API logic of **Stirling PDF**.

## Core Capabilities
- **Neural Merge**: Combine multiple delivery tickets from the `logistics_sniper` into a single "Master Route Manifest."
- **Aletheia Redaction**: Auto-redact PII (Personal Identifiable Information) from documents before uploading to public government procurement portals.
- **Sun Devil Branding**: Auto-stamp documents with standard Valley Express Maroon/Gold watermarks for authenticity.
- **Optimization**: Compress high-res scanner images from drivers into lightweight PDFs for the Master Ledger.

---

## 🛠️ Integration Map (GitHub > Local)

| Component | Source Reference | Local implementation |
| :--- | :--- | :--- |
| **PDF API Wrapper** | [Stirling-PDF/REST-API](https://github.com/Stirling-Tools/Stirling-PDF) | `scrapers/python/pdf_worker.py` |
| **OCR Engine** | Tesseract / Stirling OCR | `scrapers/python/ocr_processor.py` |
| **Visual Stamper** | Custom Branding Logic | `scrapers/python/branding_engine.py` |

---

## 🚀 Execution Workflow

1. **Ingest**: PDFs arrive via driver uploads or gov-portal downloads.
2. **Transform**: `pdf_worker.py` routes the document to the local Stirling-PDF instance (or handles it via `pikepdf` logic).
3. **Verify**: Aletheia Auditor checks for missing signatures or PII leaks.
4. **Log**: Finalized documents are linked in the **Master Ledger**.

---

## 📂 Project Structure
```text
valley-express-platform/
├── documents/
│   ├── raw/           # Incoming scans/downloads
│   ├── processed/     # Redacted/Stamped/Merged
│   └── templates/     # Maroon/Gold Header Templates
└── scrapers/python/
    ├── pdf_worker.py  # Stirling-PDF API Bridge
    └── branding_engine.py
```

---

## NEXT STEP: Initialization
- Deploy Docker container for Stirling-PDF.
- Configure `STIRLING_API_URL` in `.env.local`.
- Run first test merge on the 108 captured state contracts.
