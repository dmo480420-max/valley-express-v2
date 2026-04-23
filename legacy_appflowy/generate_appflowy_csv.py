import json
import csv
import os

# Valley Express: Sovereign Portfolio Generator
# Targets the exact column structure from your AppFlowy configuration.

JSON_SOURCE = "scrapers/data/initial_phoenix_targets.json"
OUTPUT_CSV = "AppFlowy_Master_Leads.csv"

def generate_portfolio():
    if not os.path.exists(JSON_SOURCE):
        print(f"[-] Source not found: {JSON_SOURCE}")
        return

    print(f"[*] Extracting Phoenix Intelligence from {JSON_SOURCE}...")
    
    with open(JSON_SOURCE, 'r', encoding='utf-8') as f:
        leads = json.load(f)

    # All strategic targets are elite for this stage
    elite_leads = leads
    
    # Matching the AppFlowy Screenshot Columns:
    # Email | Telephone Number | Done | Job Title | Firebase | Notes | Company
    
    with open(OUTPUT_CSV, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # Header
        writer.writerow(["Email", "Telephone Number", "Done", "Job Title", "Firebase", "Notes", "Company"])
        
        for lead in elite_leads:
            writer.writerow([
                "Pending Search...", 
                "Pending Search...",
                "False", 
                lead.get('category', 'Logistics Node'),
                lead.get('status', 'STRATEGIC'), 
                f"Focus: {lead.get('focus')} | Strategy: {lead.get('strategy')}",
                lead.get('name', 'General Prospect')
            ])

    print(f"[+] SUCCESS: Portfolio Generated at {os.path.abspath(OUTPUT_CSV)}")
    print(f"[+] Total Elite Leads Exported: {len(elite_leads)}")

if __name__ == "__main__":
    generate_portfolio()
