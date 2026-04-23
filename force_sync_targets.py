import requests
import json
import os

URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"
SOURCE_FILE = "scrapers/data/initial_phoenix_targets.json"

def force_push_targets():
    print(f"--- [FORCE SYNC] PUSHING STRATEGIC TARGETS TO LEDGER ---")
    
    if not os.path.exists(SOURCE_FILE):
        print("[-] Source file not found.")
        return

    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        targets = json.load(f)

    formatted_data = []
    for t in targets:
        formatted_data.append({
            "Company": t.get('name'),
            "Job Title": t.get('category'),
            "Status": "STRATEGIC",
            "AI Scrutiny": f"Focus: {t.get('focus')}",
            "Type": "B2B",
            "Telephone Number": "Pending Search...",
            "Email": "Pending Search..."
        })

    payload = {
        "action": "bulkPush",
        "sheetName": "Marketing Targets",
        "data": formatted_data
    }

    try:
        response = requests.post(URL, json=payload, timeout=15)
        if response.status_code == 200:
            print(f"   [SUCCESS] {len(formatted_data)} Strategic Leads pushed to 'Marketing Targets'!")
        else:
            print(f"   [FAILED] Server responded: {response.text}")
    except Exception as e:
        print(f"   [CRITICAL] Sync Error: {str(e)}")

if __name__ == "__main__":
    force_push_targets()
