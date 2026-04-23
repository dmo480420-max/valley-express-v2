import requests
import json
import datetime
import re
import os

class NeuralCloudSync:
    def __init__(self):
        self.project_id = "valley-express-os"
        self.api_key = "AIzaSyDVzuXl5kVPbh0ErE0nOk3eJ7cOYVPjCGo"
        self.root_url = f"https://firestore.googleapis.com/v1/projects/{self.project_id}/databases/(default)/documents"
        self.template_path = "APPFLOWY_MASTER_TEMPLATE.md"

    def fetch_collection(self, collection):
        url = f"{self.root_url}/{collection}"
        print(f"Polling {collection}...")
        try:
            response = requests.get(url)
            if response.status_code == 200:
                raw_data = response.json()
                documents = raw_data.get('documents', [])
                items = []
                for doc in documents:
                    fields = doc.get('fields', {})
                    # Flatten Firestore simple values
                    item = {k: list(v.values())[0] for k, v in fields.items()}
                    item['id'] = doc['name'].split('/')[-1]
                    items.append(item)
                return items
            return []
        except Exception as e:
            print(f"Fetch failed for {collection}: {e}")
            return []

    def sync_to_appflowy(self):
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # 1. Sync Load Board (Jobs)
        jobs = self.fetch_collection("jobs")
        if jobs:
            jobs = sorted(jobs, key=lambda x: str(x.get('timestamp', '')), reverse=True)
            job_rows = ""
            for j in jobs[:25]:
                prio = j.get('priority', 'NORMAL')
                job_rows += f"| {j.get('id')[:8]} | {j.get('pickup_zone', 'PHX')} | {j.get('industry', 'LOGISTICS')} | ${j.get('rate', 0)} | {j.get('rpm', 0)} | {prio} | {j.get('status', 'AVAILABLE').upper()} |\n"
            
            # Use full header as anchor
            header = "| Load ID | Pickup Zone | Industry | Rate | RPM | Priority | Status |"
            self._update_table(header, job_rows)

        # 2. Sync Marketing Targets (Leads)
        leads = self.fetch_collection("leads")
        if leads:
            lead_rows = ""
            for l in leads[:25]:
                email = l.get('email', 'N/A')
                phone = l.get('phone', 'N/A')
                done = "[ ]" # Representing the 'Done' checkbox
                title = l.get('title', l.get('job_title', 'Prospect'))
                firebase = l.get('status', 'SCRAPED')
                notes = "Automated Lead"
                company = l.get('company', l.get('name', 'General Lead'))
                
                # Matching screenshot order: Email | Telephone | Done | Job Title | Firebase | Notes | Company
                lead_rows += f"| {email} | {phone} | {done} | {title} | {firebase} | {notes} | {company} |\n"
            
            # Use full header as anchor
            header = "| Email | Telephone Number | Done | Job Title | Firebase | Notes | Company |"
            self._update_table(header, lead_rows)
            
        print(f"Dual-Sync complete. [{timestamp}]")

    def _update_table(self, header_str, rows):
        if not os.path.exists(self.template_path): return
        with open(self.template_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Escaping header for regex and finding the separator line directly after it
        escaped_header = re.escape(header_str)
        pattern = rf"({escaped_header}\n\| :--- .*?\|\n)([\s\S]*?)(\n\n|---|$)"
        replacement = r"\1" + rows + r"\3"
        content = re.sub(pattern, replacement, content, flags=re.MULTILINE)
        
        with open(self.template_path, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == "__main__":
    NeuralCloudSync().sync_to_appflowy()
