import requests
import os
from dotenv import load_dotenv

load_dotenv()

URL = os.getenv("GOOGLE_APPS_SCRIPT_URL")

print(f"Checking Ledger: {URL}")

try:
    response = requests.get(URL, params={"sheet": "Marketing Targets"})
    print(f"Status Code: {response.status_code}")
    print(f"Response Snippet: {response.text[:500]}")
    data = response.json()
    
    if data["status"] == "success":
        leads = data["data"]
        print(f"SUCCESS: Found {len(leads)} leads in Marketing Targets.")
        for i, lead in enumerate(leads[:5]):
            print(f"Lead {i+1}: {lead[0]} | Status: {lead[6] if len(lead) > 6 else 'N/A'}")
    else:
        print(f"FAILURE: {data.get('message')}")
except Exception as e:
    print(f"ERROR: {str(e)}")
