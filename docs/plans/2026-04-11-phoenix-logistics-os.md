# Phoenix Logistics OS (v1.1) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a robust Notion-n8n logistics system for gig scraping and dispatch in Phoenix, AZ, optimized for medical contracts and 1099 delivery.

**Architecture:**
- **Notion Command Center:** Three intertwined databases for raw lead capture, active dispatch, and compliance tracking.
- **n8n Automation Hub:** A modular scraping and processing engine using Python/JS nodes, Gemini AI for scoring, and Twilio for alerting.
- **Data Pipeline:** `SCRAPE` -> `AI SCORE` -> `FILTER` -> `NOTIFY` -> `SYNC TO NOTION`.

**Tech Stack:** Notion API, n8n, Gemini AI, Twilio, Gmail API.

---

### Task 1: Initialize Database Schemas

**Files:**
- Create: `phoenix-logistics-os/schema/notion_db_schemas.md`

**Step 1: Define Gig Radar Database Schema**
Define properties: Job Title (Title), Source (Select: Roadie, CourierGigs, etc.), Pay (Number), Est. Distance (Number), Medical Flag (Checkbox), AI Score (Number/Formula), Status (Select: New, Ignored, Pushed to Dispatch).

**Step 2: Define Dispatch Board Database Schema**
Define properties: Task (Title), Assigned Driver (Relation to Compliance), Pickup Time (Date), Profitability (Formula: Pay - (Distance * 0.655)), Navigation Link (URL).

**Step 3: Define Compliance Vault Database Schema**
Define properties: Driver Name (Title), HIPAA Certified (Checkbox), Insurance Expiry (Date), Vehicle Type (Select), Performance Rating (Number).

### Task 2: Scaffold Core n8n Scraper (Module A)

**Files:**
- Create: `phoenix-logistics-os/workflows/module_a_scraper.json`

**Step 1: Create HTTP Request Node for CourierGigs**
Construct the n8n node to pull latest postings from CourierGigs.

**Step 2: Create Webhook Node for External Scrapers**
Setup an n8n webhook to receive data from "Instant Data Scraper" browser extension exports.

**Step 3: Add Deduplication Logic**
Implement a Function node or Notion lookup to prevent duplicate entries in the Gig Radar.

### Task 3: Implement AI Scoring & Filtering (Module B)

**Files:**
- Create: `phoenix-logistics-os/workflows/module_b_ai_scoring.json`

**Step 1: Integrate Gemini AI Node**
Configure n8n AI node to analyze job descriptions for medical keywords ("specimen", "lab", "stat") and urgency.

**Step 2: Calculate Profitability Score**
Implement scoring logic (Pay / Distance / Time) to surface high-value "Phoenix Desert Gold" runs.

### Task 4: Deployment & Documentation

**Files:**
- Create: `phoenix-logistics-os/README.md`

**Step 1: Write Setup Guide**
Document environment variables needed (NOTION_API_KEY, TWILIO_SID, etc.).

**Step 2: Final Verification**
Test the full pipeline: Manual Trigger -> Scrape -> AI Score -> Notion Entry.
