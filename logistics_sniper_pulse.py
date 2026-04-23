import time
import datetime
import random
import os
import sys
import requests
import json
import pandas as pd
import glob

# Ensure parent directory is in path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from scrapers.python.craigslist_stealth import CraigslistStealth
from scrapers.python.deepseek_worker import DeepSeekExtractor
from scrapers.python.apify_worker import ApifyWorker
from scrapers.python.google_maps_worker import GoogleMapsSniper
from scrapers.python.duckduckgo_sentinel import DuckDuckGoSentinel

# Configuration
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

FB_GROUPS = [
    "https://www.facebook.com/groups/phoenixhotshots/",
    "https://www.facebook.com/groups/same-day-delivery-phoenix/",
    "https://www.facebook.com/groups/arizona-independent-drivers/",
    "https://www.facebook.com/groups/phoenixgigs/",
    "https://www.facebook.com/groups/cash-paid-jobs-phoenix/"
]

class LogisticsSniper:
    def __init__(self):
        self.craigslist = CraigslistStealth()
        self.apify = ApifyWorker()
        self.google_maps = GoogleMapsSniper()
        self.duck_sentinel = DuckDuckGoSentinel()
        self.aletheia = DeepSeekExtractor()
        self.pulse_count = 0

    def push_to_ledger(self, lead, sheet_name="Leads"):
        """Pushes a verified lead to a specific Sheet in the Master Ledger."""
        now = datetime.datetime.now()
        
        # UNIFIED ADMIN SCHEMA: (Leads / Marketing Targets)
        # Headers: ["Timestamp", "Company", "Job Title", "Email", "Telephone Number", "Type", "Zone", "Contact", "Status", "AI Scrutiny"]
        entry = {
            "Timestamp": now.strftime('%Y-%m-%d %H:%M:%S'),
            "Company": lead.get('company') or lead.get('source') or "N/A",
            "Job Title": lead.get('title') or lead.get('industry') or "Logistics Lead",
            "Email": lead.get('email', 'N/A'),
            "Telephone Number": lead.get('phone', 'N/A'),
            "Type": lead.get('category', 'Medical'),
            "Zone": lead.get('zone', 'Phoenix Core'),
            "Contact": lead.get('url', 'N/A'),
            "Status": "🚨 NEEDS ADMIN REVIEW",
            "AI Scrutiny": str(lead.get('truth_score', lead.get('score', 0)))
        }

        payload = {
            "action": "bulkPush",
            "sheetName": sheet_name,
            "data": [entry]
        }
        try:
            response = requests.post(GOOGLE_SCRIPT_URL, json=payload)
            if response.status_code == 200:
                self.safe_print(f"   [ADMIN LEDGER] Ingested to {sheet_name}: {entry['Company'][:30]}...")
            else:
                self.safe_print(f"   [ERROR] Ledger Push Failed: {response.text}")
        except Exception as e:
            self.safe_print(f"   [ERROR] Ledger Push Exception: {str(e)}")

    def watch_instant_data_scraper(self):
        """Checks the /data folder for any CSVs exported from Instant Data Scraper extension."""
        print("\n[6/6] CHECKING FOR 'INSTANT DATA SCRAPER' EXPORTS...")
        csv_files = glob.glob(os.path.join(DATA_DIR, "*.csv"))
        
        for file in csv_files:
            print(f"   Found manual export: {os.path.basename(file)}")
            try:
                df = pd.read_csv(file)
                # Sample the first 5 rows for ingestion
                for _, row in df.head(5).iterrows():
                    lead = {
                        "company": row.get('title') or row.get('name') or "Manual Entry",
                        "url": row.get('href') or "N/A",
                        "source": "Instant Data Scraper"
                    }
                    self.process_and_audit(lead, "Leads")
                # Backup/Remove processed file
                os.rename(file, file + ".processed")
            except Exception as e:
                print(f"   [ERROR] CSV Ingestion Failed: {str(e)}")

    def scrutinize_aletheia(self, lead):
        """Uses DeepSeek to verify lead against Aletheia ROI criteria."""
        extractor = DeepSeekExtractor()
        system_msg = "You are the Aletheia Protocol Officer. Classify this logistics lead as GOLD, SILVER, or BRONZE. Return JSON: {classification, reasoning, urgent_flag, confidence_score}"
        # Build insight prompt
        lead_data = f"Company: {lead.get('company')}\nTitle: {lead.get('title')}\nSource: {lead.get('source')}\nDetails: {lead.get('requirements', 'N/A')}"
        
        try:
            raw_result = extractor.process_generic(lead_data, system_msg)
            result = json.loads(raw_result)
            return result
        except:
            return {"classification": "BRONZE", "reasoning": "AI Scrutiny Bypass", "urgent_flag": False, "confidence_score": 0}

    def safe_print(self, msg):
        """Prints message safely for Windows terminal."""
        try:
            print(msg.encode('ascii', 'ignore').decode('ascii'))
        except:
            print("[SYNC_LOG] Non-ASCII data suppressed.")

    def process_and_audit(self, lead, sheet_target="Leads"):
        """Centralized Aletheia AI audit and Ledger push."""
        self.safe_print(f"   [ALETHEIA] Scrutinizing: {lead.get('company') or lead.get('title', 'Unknown')[:40]}...")
        time.sleep(random.uniform(1, 2)) # Rate limit
        
        # 1. Level 1: Heuristic Audit
        audit = self.craigslist.audit_lead(lead)
        lead.update(audit)
        
        # 2. Level 2: AI Intelligence Audit (Aletheia Protocol)
        intelligence = self.scrutinize_aletheia(lead)
        lead.update({
            "category": intelligence.get("classification", "BRONZE"),
            "notes": intelligence.get("reasoning", "No detail provided"),
            "urgent": intelligence.get("urgent_flag", False),
            "score": intelligence.get("confidence_score", lead.get("truth_score", 0))
        })
        
        # 3. Final Decision: Only push if AI confirms value
        if lead["category"] in ["GOLD", "SILVER"]:
            self.push_to_ledger(lead, sheet_target)
        else:
            self.safe_print(f"   [SKIP] Low Tier: {lead['category']}")


    def handle_free_discovery(self):
        """Discovers new B2B targets using zero-token DuckDuckGo Sentinel."""
        query = random.choice(["Medical Courier", "Legal Delivery", "Laboratory Logistics", "Industrial Freight"])
        raw_leads = self.duck_sentinel.hunt_broad(query)
        
        for lead in raw_leads:
            print(f"   [DISCOVERY] New Target: {lead['company']}")
            # Scrutinize with Aletheia BEFORE uploading
            scrutiny = self.aletheia.scrutinize_lead(f"Company: {lead['company']} | Desc: {lead['description']}")
            
            if scrutiny['score'] >= 7.0:
                 self.push_to_ledger({
                    "company": lead['company'],
                    "industry": lead['industry'],
                    "url": lead['url'],
                    "source": "DuckDuckGo Sentinel",
                    "category": scrutiny['category'],
                    "reasoning": scrutiny['reasoning']
                }, sheet_name="Marketing Targets")

    def handle_craigslist(self):
        """Scrapes local Gigs/Jobs (Free)."""
        print("[1/5] SCANNING CRAIGSLIST (STEALTH)...")
        cl_leads = self.craigslist.scrape_logistics_gigs()
        for lead in cl_leads:
            self.process_and_audit(lead)

    def handle_google_research(self):
        """Premium High-Fidelity Research (Consumes Google Tokens)."""
        print("[3/5] TRIGGERING GOOGLE INTELLIGENCE SNIPER...")
        queries = ["Medical Center Phoenix", "Legal Firm Phoenix", "Industrial Park Phoenix"]
        query = random.choice(queries)
        raw_leads = self.google_maps.hunt_business(query)
        
        for lead in raw_leads:
            scrutiny = self.aletheia.scrutinize_lead(f"Company: {lead['name']} | Type: {lead['type']}")
            if scrutiny['score'] >= 7.0:
                self.push_to_ledger({
                    "company": lead['name'],
                    "industry": lead['type'],
                    "phone": lead['phone'],
                    "source": "Google Sniper",
                    "category": scrutiny['category'],
                    "reasoning": scrutiny['reasoning']
                }, sheet_name="Marketing Targets")

    def run_pulse(self):
        self.pulse_count += 1
        now = datetime.datetime.now()
        print(f"\n--- [PULSE #{self.pulse_count}] SYSTEM ENGAGED: {now.strftime('%H:%M:%S')} ---")
        
        # 1. ALWAYS RUN FREE PULSE (Craigslist) - Low Frequency Local Jobs
        print("[1/6] SCANNING CRAIGSLIST (STEALTH)...")
        cl_leads = self.craigslist.fetch_leads()
        if cl_leads:
            print(f"   Found {len(cl_leads)} new Craigslist leads.")
            for lead in cl_leads[:10]:
                self.process_and_audit(lead, "Jobs")

        # 2. RUN FREE BROAD DISCOVERY (DuckDuckGo Sentinel)
        if self.pulse_count % 2 == 0:
            print("[2/6] SCANNING BROAD WEB VIA DUCKDUCKGO...")
            self.handle_free_discovery()

        # 3. CONSERVE TOKENS: PREMIUM REFINEMENT
        if self.pulse_count % 5 == 0:
            print("[3/6] SCANNING GOOGLE MAPS FOR REFINEMENT...")
            queries = ["Medical Center", "Dialysis Clinic", "Law Firm", "Industrial Supply"]
            query = random.choice(queries)
            google_leads = self.google_maps.hunt_leads(query)
            for g_lead in google_leads:
                # Wrap in standard format for audit
                g_lead['title'] = f"{g_lead['company']} ({g_lead['industry']})"
                self.process_and_audit(g_lead, "Marketing Targets")

        if self.pulse_count % 10 == 0:
            print("[4/6] SCANNING FB GROUPS VIA APIFY (HIGH COST)...")
            fb_leads = self.apify.scrape_facebook_groups(FB_GROUPS)
            for lead in fb_leads:
                self.process_and_audit(lead, "Jobs")

    def activate_24_7(self):
        """Main Loop."""
        print("[SYSTEM] B2B SOVEREIGN PULSE ACTIVATED")
        print("Status: Scraper Balancing Enabled (DuckDuckGo / Craigslist / Google / Apify)")
        while True:
            try:
                self.run_pulse()
                wait_time = random.randint(300, 900) # 5-15 mins between pulses
                print(f"Pausing for {wait_time}s to maintain stealth...")
                time.sleep(wait_time)
            except KeyboardInterrupt:
                print("Shutdown signal received.")
                break
            except Exception as e:
                print(f"[CRITICAL ERROR] {e}")
                time.sleep(60)

if __name__ == "__main__":
    sniper = LogisticsSniper()
    sniper.activate_24_7()
