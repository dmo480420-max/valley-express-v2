import requests
from bs4 import BeautifulSoup
import time
import random
import json
import os
from datetime import datetime

# Import local worker
try:
    from deepseek_worker import DeepSeekExtractor
except ImportError:
    # Fallback if in different directory
    import sys
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    from deepseek_worker import DeepSeekExtractor

class CraigslistStealth:
    """
    Sovereign Craigslist Scraper (Phoenix Hub)
    Designed for early morning 'Quick Strike' lead generation.
    """
    
    BASE_URL = "https://phoenix.craigslist.org/search/ggg"
    USER_AGENTS = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    ]

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": random.choice(self.USER_AGENTS),
            "Accept-Language": "en-US,en;q=0.9",
        })

    def fetch_leads(self, query="delivery OR courier OR driver OR transport"):
        params = {
            "query": query,
            "sort": "date"
        }
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] INITIALIZING PHOENIX CL-STEALTH PULSE...")
        
        try:
            response = self.session.get(self.BASE_URL, params=params, timeout=15)
            if response.status_code != 200:
                print(f"ERROR: Received Status {response.status_code}")
                return []

            soup = BeautifulSoup(response.text, 'html.parser')
            # Craigslist layout can vary, but usually 'ul.rows' or 'li.cl-static-search-result'
            results = soup.select('.cl-static-search-result') or soup.select('li.result-row')
            
            leads = []
            for item in results[:10]: # Process top 10 for speed
                title_elem = item.select_one('.title') or item.select_one('.result-title')
                link_elem = title_elem.get('href') if title_elem else ""
                
                lead = {
                    "source": "Craigslist (Phoenix)",
                    "title": title_elem.text.strip() if title_elem else "Unknown",
                    "url": link_elem,
                    "timestamp": datetime.now().isoformat()
                }
                leads.append(lead)
                
            return leads

        except Exception as e:
            print(f"CRITICAL SCRAPE ERROR: {str(e)}")
            return []

    def audit_lead(self, lead):
        """
        Deep Scrutiny: Uses DeepSeek to verify if the job is COD or high-value.
        """
        safe_title = lead['title'].encode('ascii', 'ignore').decode('ascii')
        print(f"AUDITING: {safe_title}...")
        
        # In a full stealth mode, we'd fetch the detail page too. 
        # For now, we analyze title + metadata.
        prompt = f"""
        Analyze this Craigslist post for a logistics company in Phoenix.
        Title: {lead['title']}
        
        Task: 
        1. Determine if this sounds like a 'COD' (Cash on Delivery) or 'Quick Pay' job.
        2. Assign a 'Truth Score' (0-100) based on authenticity.
        3. Extract 'Estimated Pay' if possible.
        
        Return JSON only:
        {{
            "is_cod": boolean,
            "truth_score": number,
            "est_pay": string,
            "category": "Medical|Freight|Hotshot|Unknown"
        }}
        """
        
        analysis = DeepSeekExtractor.process_generic(prompt, system_instruct="You are the Aletheia Truth Engine. Extract logistics data into JSON format.")
        
        try:
            # DeepSeek might wrap in ```json ... ```
            import re
            json_match = re.search(r'\{.*\}', analysis, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group())
                lead.update(result)
            else:
                lead.update({"is_cod": False, "truth_score": 0, "est_pay": "Format Error"})
        except Exception as e:
            lead.update({"is_cod": False, "truth_score": 50, "est_pay": "Audit Crash", "error": str(e)})
            
        return lead

def run_pulse():
    scraper = CraigslistStealth()
    raw_leads = scraper.fetch_leads()
    
    if not raw_leads:
        print("NO NEW LEADS IDENTIFIED.")
        return

    verified_leads = []
    for lead in raw_leads:
        # Randomized delay between audits to mimic human behavior
        time.sleep(random.uniform(2, 5))
        verified_leads.append(scraper.audit_lead(lead))
        
    # LOG RESULTS
    print("\n--- ALETHEIA MORNING REPORT ---")
    for v in verified_leads:
        status = "PASS" if v['truth_score'] > 70 else "FAIL"
        safe_title = v['title'].encode('ascii', 'ignore').decode('ascii')
        print(f"[{status}] {safe_title} | Pay: {v['est_pay']} | COD: {v['is_cod']}")

if __name__ == "__main__":
    run_pulse()
