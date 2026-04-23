# Notion Database Schemas (Phoenix Logistics OS v1.2) - FULL PRODUCTION

This document defines the triple-layer database system for the logistics engine.

## 📡 Database 1: THE RADAR (RAW_JOBS)
*The ingestion layer for all scrapers/API calls.*

| Property Name | Type | Description |
| :--- | :--- | :--- |
| **Job Title** | `Title` | Primary identifier from source |
| **Platform** | `Select` | `Roadie`, `GoShare`, `FB-Mkt`, `Wonolo`, `TaskRabbit`, `GoShare`, `CourierGigs` |
| **Pay** | `Number` | Gross pay (USD) |
| **Phoenix Segment** | `Select` | `South-PHX`, `West-Valley`, `East-Valley`, `Scottsdale`, `Tempe` |
| **Raw Payload** | `Text` | JSON blob for debugging and AI analysis |
| **Apify Task ID** | `Text` | Reference for traceability |
| **Ingested At** | `Created Time` | Automation timestamp |

---

## 🔍 Database 2: DISPATCH INTELLIGENCE (FILTERED_JOBS)
*The processing layer where AI scores and filters top-tier opportunities.*

| Property Name | Type | Description |
| :--- | :--- | :--- |
| **Opportunity** | `Title` | Refined job name |
| **AI Score** | `Number` | 0-100 based on profitability and medical sensitivity |
| **AI Grade** | `Select` | `🌟 A+ (Elite)`, `✅ A (Strong)`, `⚠️ B (Average)`, `❌ C (Low)` |
| **Medical Flag** | `Checkbox` | Checked if keywords like "specimen", "pharma" exist |
| **Vehicle Match** | `Multi-select` | `Sedan`, `SUV`, `Cargo Van`, `Box Truck` |
| **Google Maps Link** | `URL` | Deep link to driving directions |
| **Profitability** | `Formula` | `prop("Pay") - (prop("Miles") * 0.67)` (Adjusted for 2026 IRS rates) |
| **Discussion** | `Comments` | In-Notion thread for team chat |

---

## 🛠️ Database 3: THE BRIDGE (BOOKED_JOBS)
*The execution layer for active assignments.*

| Property Name | Type | Description |
| :--- | :--- | :--- |
| **Active Run** | `Title` | Final task name |
| **Driver** | `Relation` | Links to **Compliance Vault (Drivers)** |
| **Source Link** | `Relation` | Links to **FILTERED_JOBS** |
| **Booking Source** | `Select` | `Google Forms`, `Manual`, `n8n Auto-Book` |
| **Status** | `Status` | `Pickup`, `In-Transit`, `Delivered`, `Issue` |
| **POD** | `Files & Media` | Proof of Delivery uploads |
| **Client Name** | `Text` | Final recipient/sender info |

---

## 🧬 Database 4: COMPLIANCE SENTINEL (DRIVERS & USERS)
| Property Name | Type | Description |
| :--- | :--- | :--- |
| **User Name** | `Title` | Primary Name |
| **Role** | `Select` | `Admin`, `Driver`, `Customer` |
| **HIPAA Certified** | `Checkbox` | **CRITICAL** for medical runs |
| **Vehicle Model** | `Text` | e.g., "Ram ProMaster 2500" |
| **Email** | `Email` | Platform login |
| **Phone** | `Phone` | Twilio SMS target |
| **On-Duty?** | `Checkbox` | Real-time availability |

---

## 🎲 Database 5: BIDS BOARD (MARKETPLACE CORE)
| Property Name | Type | Description |
| :--- | :--- | :--- |
| **Bid ID** | `Title` | BID-[####] |
| **Gig Reference** | `Relation` | Links to **RADAR** or **FILTERED_JOBS** |
| **Driver** | `Relation` | Links to **COMPLIANCE SENTINEL** |
| **Bid Amount** | `Number` | Proposed rate |
| **ETA** | `Date` | Estimated arrival at pickup |
| **Status** | `Select` | `Submitted`, `Accepted`, `Rejected`, `Counter-Offer` |

---

## 📈 Database 6: VALLEY ANALYTICS
| Property Name | Type | Description |
| :--- | :--- | :--- |
| **Metric Period** | `Title` | Week of [Date] |
| **Total Revenue** | `Rollup` | Sum of Pay (Booked) |
| **Driver Payouts** | `Rollup` | Sum of Bids (Accepted) |
| **Net Profit** | `Formula` | `Revenue - Payouts` |
| **Scraper Success** | `Number` | % of scraped jobs that went to bid |
