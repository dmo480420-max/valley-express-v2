# 🏛️ AppFlowy Mission Control (Valley Express)

## Overview
AppFlowy is the **Sovereign Command Center** for Valley Express. While the Google Sheet serves as the "Master Ledger" for ingestion, AppFlowy provides the "Deep Strategy" layer—handling project documentation, driver onboarding status, and long-form B2G bid drafting in a private, local-first environment.

---

## 🚀 Deployment (Self-Hosted)
The AppFlowy Cloud infrastructure has been cloned to `./appflowy-cloud`. To launch the command center:

1. **Enter the directory**: `cd appflowy-cloud`
2. **Configure environment**: `cp deploy.env .env`
3. **Launch Docker**: `docker-compose up -d`

---

## 🔄 Sync Protocol: Sheet -> AppFlowy
We use a **Neural Bridge** to push verified leads (Truth Score >= 80) from the Google Ledger directly into an AppFlowy Database for strategic follow-up.

### Pipeline:
1. **Pulse**: Scraper ingests leads to Google Sheet.
2. **Audit**: Aletheia Protocol tags leads as "High Value."
3. **Sync**: `appflowy_sync.py` pushes "High Value" rows to the AppFlowy "Strike List."

---

## 🎯 Strategizing B2G Bids
Use AppFlowy's **AI-Assisted Documents** to draft:
- **RFPs**: Assemble captured government contracts into professional responses.
- **Driver Manuals**: Create ASU Sun Devil-branded onboarding guides.
- **Operational Wikis**: Documentation for the "Logistics Sniper" routine.

---

## 🛠️ Maintenance
- **Data Persistence**: Backup the `./appflowy-cloud/data` directory periodically.
- **Updates**: Run `git pull` in the `appflowy-cloud` directory regularly to stay on the latest version.
