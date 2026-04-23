# Phoenix Logistics OS (v1.1) Setup & Deployment Guide

## 📡 Setup Model A: n8n Master Workflow
1.  **Import:** Import `phoenix-logistics-os/workflows/phoenix_master_dispatch.json` into your n8n instance.
2.  **Credentials:**
    -   Setup `Roadie API` with your Bearer Token.
    -   Setup `CourierGigs API` with your X-API-KEY.
    -   Setup `Notion API` credentials.
    -   Setup `Gmail API` (OAuth2 recommended) for alerts.
3.  **Variables:** Update the `ENTER_NOTION_DB_ID` in the Notion nodes with the ID of your **Gig Radar** database.

## 🛠️ Setup Model B: Notion Dashboard
Follow these steps to build the high-fidelity UI:

### 1. The Gig Radar (Gallery View)
- Create a Gallery view of the RAW_JOBS database.
- **Card Preview:** Choose "Page Cover" or "AI Score".
- **Properties to Show:** `Pay`, `AI Score`, `Job Source`, `Medical Flag`.
- **Filter:** `Status` is `🆕 New`.

### 2. The Command Center (Timeline View)
- Create a Timeline view of the BOOKED_JOBS database.
- Use `Pickup Time` as the timeline start.
- **Group by:** `Assigned Driver`.

### 3. Compliance Sentinel (List View)
- Create a List view of the DRIVERS database.
- **Filter:** `HIPAA Certified` is `Checked`.
- **Sort by:** `Performance Rating` (Descending).

## 🚀 Deployment Checklist
- [ ] Notion Databases created with correct schemas.
- [ ] n8n Workflow imported and Notion DB IDs linked.
- [ ] API Keys verified.
- [ ] Twilio/Gmail alerts tested.
