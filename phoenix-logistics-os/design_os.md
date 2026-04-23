# Phoenix Logistics OS (v1.1) - The "Fresh Architect" Design

## 🏗️ Model A: The Scraper (n8n Backend)
Model A is the autonomous engine that perpetually hunts for high-value medical and 1099 delivery gigs.

### Advanced Logic
- **Modular Inputs:** 
  - `HTTPS`: Direct API requests to CourierGigs.
  - `Webhook`: Listening for browser scraping exports (Instant Data Scraper).
  - `RSS/Reddit`: Listening to r/phoenixclassifieds.
- **De-duplication:** Uses a hash of (Source + Job Title + Pay) to ensure uniqueness in Notion.

---

## 🏗️ Model B: The Dispatch Intelligence (Notion Frontend)
Model B is the human-in-the-loop dashboard where jobs are scored, ranked, and assigned.

### Key Visual Components
- **The War Room (Gallery View):** Displays available jobs as cards with "AI Score" and "Medical Urgency" badges.
- **Profitability Heatmap (Timeline View):** Projects earnings based on distance and scheduled timing.
- **Compliance Sentinel:** A list of drivers that auto-filters based on "HIPAA Certified" checkbox (critical for specimen runs).

---

## 🔗 Combined Logic Flow
1. **Scrape** (Model A) -> **Push to Notion** (Model B).
2. **AI Analysis** (Model B) -> **Update Score** (Model A/Gemini).
3. **Notify** (SMS/Twilio) if Score > 85.
