import requests
import csv
import os
from dotenv import load_dotenv

# Load Sovereign Environment
load_dotenv()
GOOGLE_SCRIPT_URL = os.getenv("GOOGLE_APPS_SCRIPT_URL")

def fetch_and_pack_for_appflowy():
    print("--- [NEURAL BRIDGE] EXTRACTING DATA FOR APPFLOWY ---")
    
    # 1. Fetch Marketing Targets
    try:
        response = requests.get(f"{GOOGLE_SCRIPT_URL}?action=getSheetData&sheetName=Marketing Targets")
        if response.status_code == 200:
            leads = response.json()
            print(f"   Successfully retrieved {len(leads)} B2B Targets.")
            
            # 2. Pack into AppFlowy Optimized CSV
            # Columns: Name, Status, Tags, Contact, Source, Notes
            csv_path = "AppFlowy_Lead_Portfolio.csv"
            with open(csv_path, mode='w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                # Header
                writer.writerow(["Name", "Status", "Priority", "Contact Info", "Source", "Aletheia Reasoning"])
                
                for lead in leads:
                    writer.writerow([
                        lead.get("Company", "Unknown"),
                        lead.get("Status", "NEW"),
                        lead.get("Aletheia Rank", "BRONZE"),
                        f"{lead.get('Telephone Number', '')} | {lead.get('Email', '')}",
                        lead.get("Source", "Google Sniper"),
                        lead.get("Notes", "No detail provided")
                    ])
            
            print(f"--- [COMPLETE] PORTFOLIO READY: {os.path.abspath(csv_path)} ---")
            return csv_path
        else:
            print(f"   [ERROR] Bridge Failed: {response.text}")
            return None
    except Exception as e:
        print(f"   [CRITICAL ERROR] {e}")
        return None

if __name__ == "__main__":
    fetch_and_pack_for_appflowy()
