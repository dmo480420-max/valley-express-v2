import os
import requests
from dotenv import load_dotenv

# Load Sovereign Environment
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
load_dotenv(env_path)

GAS_URL = os.getenv("GOOGLE_APPS_SCRIPT_URL")

def check_keys():
    print(f"--- [LEDGER AUDIT] PULLING SAMPLE DATA ---")
    res = requests.get(f"{GAS_URL}?action=getSheetData&sheetName=Marketing Targets")
    if res.status_code == 200:
        data = res.json()
        if data and len(data) > 0:
            sample = data[0]
            print("FOUND KEYS IN GOOGLE SHEET:")
            for k in sample.keys():
                print(f"- '{k}'")
        else:
            print("NO DATA FOUND IN SHEET.")
    else:
        print(f"FAILED TO REACH LEDGER: {res.status_code}")

if __name__ == "__main__":
    check_keys()
