import requests
import json
import datetime
import time
import os
import re

# 🔱 VALLEY EXPRESS | NEURAL CONTINUOUS SENTINEL
# Continuous 5-minute heartbeat sync from Cloud -> AppFlowy

class NeuralSentinel:
    def __init__(self):
        self.project_id = "valley-express-os"
        self.api_key = "AIzaSyDVzuXl5kVPbh0ErE0nOk3eJ7cOYVPjCGo"
        self.base_url = f"https://firestore.googleapis.com/v1/projects/{self.project_id}/databases/(default)/documents/jobs"
        self.template_path = "APPFLOWY_MASTER_TEMPLATE.md"

    def fetch_and_sync(self):
        timestamp = datetime.datetime.now().strftime('%H:%M:%S')
        print(f"[{timestamp}] Initiating Neural Pulse...")
        
        try:
            response = requests.get(self.base_url)
            if response.status_code == 200:
                raw_data = response.json()
                documents = raw_data.get('documents', [])
                
                jobs = []
                for doc in documents:
                    fields = doc.get('fields', {})
                    # Standardize fields for AppFlowy Table
                    job = {k: list(v.values())[0] for k, v in fields.items()}
                    job['id'] = doc['name'].split('/')[-1][:8]
                    jobs.append(job)
                
                # Sort by latest
                jobs = sorted(jobs, key=lambda x: str(x.get('timestamp', '')), reverse=True)

                # Format the AppFlowy Table
                header = "| Load ID | Pickup Zone | Industry | Rate | Priority | Status |\n"
                sep    = "| :--- | :--- | :--- | :--- | :--- | :--- |\n"
                rows   = ""
                for j in jobs[:30]:
                    prio = f"HOT" if j.get('priority') == 'HOT' else j.get('priority', 'NORMAL')
                    rows += f"| {j['id']} | {j.get('pickup_zone', 'PHX')} | {j.get('industry', 'Medical')} | ${j.get('rate', 0)} | {prio} | {j.get('status', 'AVAILABLE').upper()} |\n"

                # Patch the Master Template
                if os.path.exists(self.template_path):
                    with open(self.template_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    table_content = f"{header}{sep}{rows}"
                    content = re.sub(r"\| Load ID \|[\s\S]*?(\n\n|$)", table_content + "\n", content)
                    content = re.sub(r"- Last Cloud Sync: .*", f"- Last Cloud Sync: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", content)

                    with open(self.template_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"[{timestamp}] Sync Successful. Board Refresh Complete.")
                else:
                    print(f"[{timestamp}] Error: Master Template not found.")
            else:
                print(f"[{timestamp}] Cloud Error: {response.status_code}")
        except Exception as e:
            print(f"[{timestamp}] Pulse Failed: {e}")

if __name__ == "__main__":
    sentinel = NeuralSentinel()
    print("--------------------------------------------------")
    print("🔱 VALLEY EXPRESS | NEURAL CONTINUOUS SENTINEL")
    print("STATUS: ACTIVE")
    print("INTERVAL: 5 MINUTES")
    print("--------------------------------------------------")
    
    while True:
        sentinel.fetch_and_sync()
        time.sleep(300) # 5-minute heartbeat
