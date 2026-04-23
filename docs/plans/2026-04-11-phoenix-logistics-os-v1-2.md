# Phoenix Logistics OS (v1.2) - Expanded Architecture

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the initial logsitics engine into a high-fidelity, production-ready system with Apify scraping, AI-driven dispatch scoring, and a triple-layer Notion dashboard.

**Architecture:**
- **Tri-Database Flow:** 
  1. `RAW_JOBS`: High-volume ingestion from Apify/Roadie/FB.
  2. `FILTERED_JOBS`: AI-scored opportunities (only Score > 70).
  3. `BOOKED_JOBS`: Final execution tracks with Google Forms sync.
- **Dispatch Intelligence:** n8n workflow with Google Maps distance matrix, Gemini scoring, and multi-channel alerting (Twilio/Gmail/Notion).

---

### Task 1: Comprehensive Schema Expansion

**Files:**
- Modify: `phoenix-logistics-os/schema/notion_db_schemas.md`

**Step 1: Update RAW_JOBS Database**
Add properties: `Apify Task ID` (Text), `Platform` (Select), `Geofence Status` (Select), `Raw Payload` (Text).

**Step 2: Create FILTERED_JOBS Database**
This sits between RAW and BOOKED. Properties: `Job Title` (Title), `AI Grade` (Select: A+, A, B, C), `Medical Sensitivity` (Select: High, Low), `Vehicle Required` (Select).

**Step 3: Update BOOKED_JOBS Database**
Add Relation to `FILTERED_JOBS`. Add `Booking Source` (Select: Google Forms, Manual). Add `GPS Link` (URL).

### Task 2: Advanced n8n Scraper with Apify (Module A+)

**Files:**
- Create: `phoenix-logistics-os/workflows/module_a_apify_engine.json`

**Step 1: Configure Apify Actor Node**
Add nodes for FB Marketplace Scraper and Generic Scraper (for Wonolo/GoShare).

**Step 2: Implement Google Maps Node**
Use the Google Maps node to calculate exact driving distance for every new gig in the Phoenix metro.

**Step 3: Add Deduplication and Rate Limiting**
Ensure we don't spam the Notion API or create duplicate entries for the same Apify run.

### Task 3: The "Brain" - Smart AI Scoring (Module B+)

**Files:**
- Create: `phoenix-logistics-os/workflows/module_b_dispatch_brain.json`

**Step 1: Multi-Factor Scoring with Gemini**
Prompt Gemini with: Pay, Distance, Time, Keywords (Medical), and Vehicle Match. Output a structured JSON with a Score (0-100) and rationale.

**Step 2: Multichannel Alerts**
Add Twilio node for SMS (if score > 85). Add Notion Comment node for High-Value Job discussion.

### Task 4: UI Build & Google Forms Integration

**Files:**
- Create: `phoenix-logistics-os/resources/ui_dashboard_v1-2.md`
- Create: `phoenix-logistics-os/workflows/google_forms_sync.json`

**Step 1: Design the "War Room" Dashboard**
Define the layout for Active Gigs Gallery and Command Center Timeline.

**Step 2: Build Google Forms -> Notion Sync**
Create a simple n8n webhook that listens to Google Forms submissions and creates a record in `BOOKED_JOBS`.
