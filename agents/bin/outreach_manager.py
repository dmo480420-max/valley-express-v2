import sys
import os
import time
import requests
import json
from datetime import datetime
from dotenv import load_dotenv

# Add root project path to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform")))

# Load Env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform", ".env"))

# Import DeepSeek for drafting (Absolute Load)
import importlib.util
worker_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform", "scrapers", "python", "deepseek_worker.py"))
spec = importlib.util.spec_from_file_location("deepseek_worker", worker_path)
ds_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ds_module)
process_generic = ds_module.process_generic

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

class OutreachManager:
    """
    AGENT 3: THE OUTREACH & CRM MANAGER
    Mission: Draft professional proposals and manage B2B communications.
    """
    
    TEMPLATES = {
        "Medical": "Emphasis on chain-of-custody, HIPAA compliance, and refrigerated transport.",
        "Dental": "Focus on high-frequency lab pickups and same-day turnaround for prosthetics.",
        "Warehouse": "Highlight cross-docking, high-volume pallet delivery, and local route optimization.",
        "Government": "Focus on reliability, security clearance, and strict RFP compliance.",
        "Default": "Professional logistics partnership for the Phoenix sector."
    }

    def fetch_targets(self):
        """Fetches all leads from Notion for diagnostic scan."""
        url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
        # query = {
        #     "filter": {
        #         "or": [
        #             {"property": "Status", "select": {"equals": "NEW"}},
        #             {"property": "Status", "select": {"equals": "SCANNED"}}
        #         ]
        #     }
        # }
        res = requests.post(url, headers=HEADERS, json={})
        if res.status_code == 200:
            results = res.json().get("results", [])
            print(f"DIAGNOSTIC: Found {len(results)} total leads in database.")
            return results
        else:
            print(f"DIAGNOSTIC ERROR: {res.status_code} - {res.text}")
            return []

    def draft_proposal(self, name, category, notes):
        """Uses DeepSeek to draft a personalized logistics proposal."""
        template_hint = self.TEMPLATES.get(category, self.TEMPLATES["Default"])
        
        prompt = f"""
        Draft a highly professional B2B cold email from Valley Express Transport.
        Company: {name}
        Sector: {category}
        Context: {notes}
        Constraint: {template_hint}
        
        Style: Upper-echelon, professional, direct, and authoritative (ASU-themed palette colors: Maroon and Gold).
        Signature: The Valley Express Fleet Management Team.
        
        Return the Email Content ONLY.
        """
        
        return process_generic(prompt, system_instruct="You are Agent 3: The Outreach & CRM Manager for Valley Express.")

    def push_draft_to_notion(self, page_id, draft):
        """Saves the drafted email back to Notion and updates status."""
        url = f"https://api.notion.com/v1/pages/{page_id}"
        payload = {
            "properties": {
                "Status": {"select": {"name": "DRAFTED"}},
                "Notes": {
                    "rich_text": [
                        {"text": {"content": draft[:2000]}} # Notion char limit per chunk
                    ]
                }
            }
        }
        requests.patch(url, headers=HEADERS, json=payload)

    def run_engagement_cycle(self):
        print(f"--- [OUTREACH_MANAGER] ENGAGEMENT CYCLE: {datetime.now()} ---")
        targets = self.fetch_targets()
        print(f"Found {len(targets)} targets requiring proposals.")
        
        for t in targets:
            name = t["properties"]["Name"]["title"][0]["text"]["content"]
            category = t["properties"].get("Category", {}).get("select", {}).get("name", "Logistics")
            notes = "".join([rt["text"]["content"] for rt in t["properties"].get("Notes", {}).get("rich_text", [])])
            
            print(f"Drafting Proposal for: {name} ({category})...")
            draft = self.draft_proposal(name, category, notes)
            self.push_draft_to_notion(t["id"], draft)
            print(f"Draft complete and stored in Notion.")
            time.sleep(2) # Avoid rate limits

if __name__ == "__main__":
    manager = OutreachManager()
    manager.run_engagement_cycle()
