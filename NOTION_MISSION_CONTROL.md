# 📓 Notion Mission Control (Valley Express)

## Overview
Notion has replaced AppFlowy as the **Primary Sovereign CRM and Strategic Command Center**. It serves as the bridge between raw lead ingestion (Google Sheets/Firebase) and long-term business development, B2G bid drafting, and driver personnel management.

---

## 🚀 Setup Instructions

1. **Create an Integration**:
   - Go to [Notion My Integrations](https://www.notion.so/my-integrations).
   - Create a new integration named `Valley Express OS`.
   - Copy the **Internal Integration Token** and add it to your `.env` as `NOTION_TOKEN`.

2. **Prepare the Database**:
   - Create a new **Database** (Full Page) in Notion named `Strike List`.
   - Add the following properties (match exactly for automation):
     - `Company`: (Title)
     - `Status`: (Select) - Options: `NEW`, `CONTACTED`, `QUALIFIED`, `BID SUBMITTED`
     - `AI Scrutiny`: (Select) - Options: `GOLD`, `SILVER`, `BRONZE`
     - `Contact Info`: (Rich Text)
     - `Email`: (Email)
     - `Phone`: (Phone)
     - `Source`: (Select)
     - `Notes`: (Rich Text)
   - **Crucial**: "Connect" the integration to the Page (Settings -> Add Connections -> Search for `Valley Express OS`).
   - Copy the **Database ID** (from the URL: `notion.so/[DATABASE_ID]?v=...`) and add it to your `.env` as `NOTION_DATABASE_ID`.

---

## 🔄 Sync Protocol: Pulse -> Notion

Verification of high-value leads automatically triggers a sync to the Notion Strike List.

### Pipeline:
1. **Pulse**: Scraper ingests leads to Google Sheet.
2. **Audit**: Aletheia Protocol evaluates leads.
3. **Notion Bridge**: `notion_bridge.py` pushes verified `GOLD` and `SILVER` leads into Notion for CRM tracking.

---

## 🎯 Strategic Tasks in Notion
- **B2G Strategy**: Use Notion's AI to draft bid responses directly within the "B2G Bids" database.
- **Fleet Management**: Track driver documentation, insurance renewals, and ASU branding compliance.
- **SOP Wiki**: Centralized documentation for the "Logistics Sniper" operating procedures.

---

## 🛠️ Maintenance
- **API Limits**: Be mindful of Notion's rate limits (3 requests per second).
- **Backups**: Use Notion's built-in export tool for weekly workspace snapshots.
