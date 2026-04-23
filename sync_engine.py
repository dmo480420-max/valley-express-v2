import os
import json
import time
import datetime
import random
import re
from typing import List, Dict, Optional
from dotenv import load_dotenv

# Load DeepSeek & Config
load_dotenv('.env.local')

# Import our specialized extractor
try:
    from scrapers.python.deepseek_worker import DeepSeekExtractor
except ImportError:
    import sys
    sys.path.append(os.path.join(os.path.dirname(__file__), 'scrapers', 'python'))
    from deepseek_worker import DeepSeekExtractor

class SmartSyncEngineV3:
    """
    VALLEY EXPRESS BACKEND AUTOMATION (PART 3)
    Fully automated dispatcher with profit control and intelligent driver matching.
    """
    
    PHOENIX_ZONES = [
        "Downtown Phoenix", "Scottsdale", "Tempe", "Mesa", 
        "Chandler", "Glendale", "Gilbert", "Peoria", "Surprise", "Avondale",
        "Phoenix North", "West Valley", "East Valley"
    ]
    
    MIN_RPM = 3.00
    MIN_PROFIT_THRESHOLD = 7.50 # Minimum profit per job for Valley Express
    DRIVER_PAYOUT_RATIO = 0.70 # Drivers get 70%

    def __init__(self):
        self.extractor = DeepSeekExtractor()
        self.template_path = "APPFLOWY_MASTER_TEMPLATE.md"
        self.db_jobs = "data/jobs_ledger.json"
        self.db_drivers = "data/drivers.json"
        self.db_shippers = "data/shippers.json"
        
        if not os.path.exists("data"):
            os.makedirs("data")

    def load_db(self, path: str) -> List[Dict]:
        if not os.path.exists(path): return []
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def save_db(self, path: str, data: List[Dict]):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)

    def is_phoenix_local(self, text: str) -> bool:
        """Rigorous geographic lock for Phoenix Metro."""
        if not text: return False
        metro_keywords = self.PHOENIX_ZONES + ["Phoenix", "AZ", "Downtown", "Valley"]
        text_lower = text.lower()
        return any(k.lower() in text_lower for k in metro_keywords)

    def calculate_metrics(self, job: Dict) -> Dict:
        """
        Calculates RPM and Profitability using specified logic.
        Reject jobs with rate < $25 AND RPM < $3.00.
        """
        rate = float(job.get('rate', 0))
        miles = float(job.get('miles', 0))
        
        # RPM calculation
        if miles > 0:
            job['rpm'] = round(rate / miles, 2)
        else:
            job['rpm'] = rate # Treat as flat rate
            job['miles'] = 0
            
        # Profit Calculation (Drivers get 70%)
        job['driver_payout'] = round(rate * self.DRIVER_PAYOUT_RATIO, 2)
        job['profit'] = round(rate - job['driver_payout'], 2)
        
        return job

    def assign_priority(self, job: Dict, jobs_history: List[Dict]) -> str:
        """
        HOT: Rush, Known/Repeat (Freq > 1), or Rate > $75
        NORMAL: Standard
        LOW: Low Rate or Low Urgency
        """
        title = job.get('title', '').lower()
        summary = job.get('summary', '').lower()
        company = job.get('company_name', '').lower()
        
        is_rush = "rush" in title or "immediately" in title or "urgent" in summary
        is_repeat = len([j for j in jobs_history if j.get('company_name', '').lower() == company]) > 0
        high_rate = job.get('rate', 0) > 75
        
        if is_rush or is_repeat or high_rate:
            return "HOT"
        if job.get('rpm', 0) < 2.50:
            return "LOW"
        return "NORMAL"

    def check_contract_opportunity(self, company_name: str, jobs_history: List[Dict]) -> bool:
        """Flag any company appearing more than 3 times as a Contract Opportunity."""
        if not company_name: return False
        freq = len([j for j in jobs_history if j.get('company_name', '').lower() == company_name.lower()])
        return freq >= 3

    def match_best_driver(self, job: Dict, drivers: List[Dict]) -> Optional[Dict]:
        """Select best online driver same pickup zone with highest rating."""
        available = [d for d in drivers if d["status"] == "online"]
        if not available: return None

        # Best Match: Zone match > Highest Rating
        def rank_driver(d):
            zone_match = 0 if d["current_zone"] == job.get("pickup_zone") else 1
            return (zone_match, -d["rating"])

        sorted_drivers = sorted(available, key=rank_driver)
        return sorted_drivers[0]

    def update_appflowy(self):
        """Syncs the live Load Board table."""
        jobs = self.load_db(self.db_jobs)
        drivers = self.load_db(self.db_drivers)
        
        # Calculate Stats
        today_str = datetime.datetime.now().strftime("%Y-%m-%d")
        today_jobs = [j for j in jobs if j.get('created_at', '').startswith(today_str)]
        
        # Sort by latest first
        jobs_sorted = sorted(jobs, key=lambda x: x.get('timestamp', x.get('created_at', '')), reverse=True)

        # Format Kanban Rows
        kanban_rows = ""
        # Show top 25 latest records
        for job in jobs_sorted[:25]:
            status = job.get('status', 'available').upper()
            priority_tag = f"🔥 {job.get('priority')}" if job.get('priority') == 'HOT' else job.get('priority')
            contract_tag = " [CONTRACT OPP]" if job.get('is_contract_opp') else ""
            
            kanban_rows += f"| {job.get('id', 'N/A')} | {job.get('pickup_zone', 'N/A')} | {job.get('dropoff_zone', 'N/A')} | {job.get('industry', 'N/A')} | ${job.get('rate', 0)} | {job.get('miles', 0)} | {job.get('rpm', 0)} | {priority_tag}{contract_tag} | {job.get('assigned_driver_id', 'PENDING')} | {status} |\n"

        try:
            with open(self.template_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 1. Update Snapshot
            content = re.sub(r"- Total Loads Today: .*", f"- Total Loads Today: {len(today_jobs)}", content)
            content = re.sub(r"- Revenue Today: .*", f"- Revenue Today: ${sum([j.get('rate', 0) for j in today_jobs]):,.2f}", content)
            
            # 2. Update Kanban
            header = "| Load ID | Pickup Zone | Dropoff Zone | Industry | Rate ($) | Miles | RPM | Priority | Driver Match | Status |"
            sep = "| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |"
            if header in content:
                parts = content.split(header)
                # Find the end of the table
                table_end_parts = parts[1].split("\n\n", 1)
                after_table = table_end_parts[1] if len(table_end_parts) > 1 else ""
                content = parts[0] + header + "\n" + sep + "\n" + kanban_rows + "\n" + after_table
            
            with open(self.template_path, 'w', encoding='utf-8') as f:
                f.write(content)
        except Exception as e:
            print(f"[Error] AppFlowy Update failed: {e}")

    def process_new_leads(self, raw_leads: List[Dict]):
        """Smart Local Dispatch Sync Pipeline."""
        print(f"\n--- VALLEY EXPRESS SMART SYNC ENGINE: {datetime.datetime.now()} ---")
        
        drivers = self.load_db(self.db_drivers)
        jobs = self.load_db(self.db_jobs)
        processed_count = 0

        for lead in raw_leads:
            # STEP 1: FILTER DATA
            combined_text = f"{lead.get('title', '')} {lead.get('summary', '')}"
            if not self.is_phoenix_local(combined_text):
                print(f"   [REJECT] Geographic: Non-Local")
                continue
            
            if not lead.get('title') or not lead.get('summary'):
                print(f"   [REJECT] Integrity: Missing Data")
                continue

            # STEP 2 & 3: STANDARDIZE & CALCULATE
            prompt = f"""
            Extract structured logistics details for: {combined_text}
            
            JSON Schema:
            - company_name: string
            - pickup_address: string
            - dropoff_address: string
            - pickup_zone: Downtown, Scottsdale, Tempe, Mesa, Chandler, Glendale, North Phoenix, or West Valley
            - dropoff_zone: (Same list as above)
            - industry: Legal, Dental, Medical, Auto Parts, Floral, Semiconductor, or General
            - miles: number
            - rate: number
            """
            analysis_raw = self.extractor.process_generic(prompt, system_instruct="Phoenix Logistics Dispatcher.")
            
            try:
                json_match = re.search(r'\{.*\}', analysis_raw, re.DOTALL)
                if not json_match: continue
                job = json.loads(json_match.group(0))
                
                # STEP 1 (Economic Filter): Reject rate < $25 AND RPM < $3.00
                job = self.calculate_metrics(job)
                if job.get('rate', 0) < 25 and job.get('rpm', 0) < 3.00:
                    print(f"   [REJECT] Economic: Rate ${job.get('rate')} | RPM ${job.get('rpm')}")
                    continue
                
                # STEP 4: ASSIGN PRIORITY
                job['priority'] = self.assign_priority(job, jobs)
                
                # STEP 5: CONTRACT OPPORTUNITY
                job['is_contract_opp'] = self.check_contract_opportunity(job.get('company_name'), jobs)
                
                # Metadata
                job['id'] = f"VEX-V3-{random.randint(1000, 9999)}"
                job['created_at'] = datetime.datetime.now().isoformat()
                job['timestamp'] = job['created_at']
                job['source_link'] = lead.get('url', 'N/A')
                job['call_logs'] = []
                job['bid_submitted'] = False

                # STEP 5: DRIVER MATCHING
                match = self.match_best_driver(job, drivers)
                if match:
                    job['assigned_driver_id'] = match['id']
                    job['status'] = "assigned"
                else:
                    job['assigned_driver_id'] = "unassigned"
                    job['status'] = "available"

                jobs.append(job)
                processed_count += 1
                print(f"   [PUSHED] {job['id']} | {job['company_name']} | ${job['rate']}")

            except Exception as e:
                print(f"   [Error] {e}")

        # Save updates
        self.save_db(self.db_jobs, jobs)
        if processed_count > 0:
            self.update_appflowy()
            print(f"SYNC COMPLETE: {processed_count} records sent to Load Board.")

if __name__ == "__main__":
    engine = SmartSyncEngineV3()
    mock_leads = [
        {"title": "Rush Medical Courier - Banner Health", "summary": "Urgent Downtown Phoenix to Scottsdale. 15 miles. $95.", "url": "#"},
        {"title": "Spam Lead", "summary": "Call for cheap movers. Florida based.", "url": "#"},
        {"title": "Low Value Box", "summary": "Mesa to Gilbert. 5 miles. $15.", "url": "#"},
        {"title": "Dental Lab Route", "summary": "Scottsdale to Tempe. 8 miles. $45.", "url": "#"}
    ]
    engine.process_new_leads(mock_leads)

