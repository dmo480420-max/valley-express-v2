# Phoenix Logistics OS (v1.2) - UI Dashboard Guide

## 🏢 Notion "War Room" Configuration

### 1. View: Active Gigs (Gallery)
- **Database:** `FILTERED_JOBS`
- **Card Preview:** `Page Cover`
- **Properties Visible:** `AI Grade` (🌟), `Medical Flag` (🏥), `Pay` ($), `Platform`.
- **Filter:** `Status` is `🆕 New` AND `AI Score` > 70.
- **Sort:** `AI Score` (Descending).

### 2. View: Command Center (Timeline)
- **Database:** `BOOKED_JOBS`
- **Date Range:** `Pickup Time` to `Dropoff Time`.
- **Properties Visible:** `Status`, `Relation (Driver)`.
- **Group by:** `Assigned Driver`.

### 3. View: Compliance Sentinel (List)
- **Database:** `DRIVERS`
- **Filter:** `HIPAA Certified` is `Checked`.
- **Badge:** Show `Vehicle Model` and `Performance Rating`.

---

## 🎛️ n8n Integration Setup

### Apify Scrapers
- Ensure the **Apify API Key** is added to n8n credentials.
- Actors utilized:
  - `apify/facebook-marketplace-scraper`
  - `apify/web-scraper` (for custom Wonolo/OfferUp runs)

### Google Maps Distance Matrix
- Required Scopes: `https://www.googleapis.com/auth/maps-platform.distancematrix`.
- This ensures we don't just see "Phoenix," but "Apache Junction to Buckeye."

### Twilio Configuration
- **From Number:** Verified Twilio number.
- **To Number:** Your dispatch mobile.
