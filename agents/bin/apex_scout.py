import sys
import os
import time
import asyncio
import random
from datetime import datetime

# Add root project path to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform")))

# Import Scraping Components
try:
    from scrapers.python.craigslist_stealth import CraigslistStealth
    from notion_bridge import push_lead_to_notion
except ImportError as e:
    print(f"IMPORT ERROR: {e}")
    # Fallback to local import structure if needed
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform")))
    from notion_bridge import push_lead_to_notion

class ApexScout:
    """
    AGENT 1: THE LOCAL FREIGHT HUNTER
    Mission: Continuous Phoenix Hub freight lead ingestion.
    """
    
    def __init__(self):
        self.cl_scraper = CraigslistStealth()
        self.target_zones = ["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler", "Glendale"]
        self.sectors = ["Medical", "Legal", "Dental", "Floral", "Auto Parts", "Semiconductor"]
        
    async def pulse(self):
        print(f"\n--- [APEX_SCOUT] PULSE INITIALIZED: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ---")
        
        # 1. SCRAPE CRAIGSLIST (PHOENIX HUB)
        print("SEARCHING Phoenix Craigslist for Hotshot/Delivery loads...")
        cl_leads = self.cl_scraper.fetch_leads("delivery OR courier OR medical OR dental OR court")
        
        verified_count = 0
        for lead in cl_leads:
            # Random wait to avoid detection
            time.sleep(random.uniform(2, 4))
            
            # Audit the lead
            audited = self.cl_scraper.audit_lead(lead)
            
            # Profitability Guardrail: Score > 75 (High Probability)
            if audited.get('truth_score', 0) > 75:
                print(f"[TARGET ACQUIRED] {audited['title']} | SCORE: {audited['truth_score']}")
                
                # 2. PUSH TO NOTION STRIKE LIST
                # Normalize for bridge (Company, Status, AI Scrutiny, etc.)
                audited["Company"] = audited["title"]
                audited["Status"] = "NEW"
                audited["AI Scrutiny"] = "GOLD" if audited["truth_score"] > 85 else "SILVER"
                audited["Source"] = "Apex Scout"
                audited["Google Maps URL"] = audited.get("url", "")
                
                print(f"SYNCING to Notion Strike List...")
                if push_lead_to_notion(audited):
                    verified_count += 1
            else:
                print(f"[REJECTED] {audited['title']} (Score: {audited.get('truth_score',0)})")

        print(f"--- [APEX_SCOUT] CYCLE COMPLETE. {verified_count} TARGETS IDENTIFIED. ---")

    async def run_forever(self):
        """High-frequency continuous run."""
        while True:
            try:
                await self.pulse()
                # Wait 15-30 mins between full hub scans
                delay = random.randint(900, 1800)
                print(f"Scout entering overwatch mode. Next scan in {delay//60} mins.")
                await asyncio.sleep(delay)
            except Exception as e:
                print(f"Scout System Error: {e}")
                await asyncio.sleep(60)

if __name__ == "__main__":
    scout = ApexScout()
    asyncio.run(scout.run_forever())
