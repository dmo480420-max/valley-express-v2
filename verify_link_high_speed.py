import requests
import os
from dotenv import load_dotenv

load_dotenv()
URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"

def verify():
    print(f"--- [PULSE CHECK] TESTING LINK: {URL} ---")
    try:
        # Testing doGet - getSheetData
        test_url = f"{URL}?action=getSheetData&sheetName=Marketing Targets"
        response = requests.get(test_url, timeout=15)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            try:
                data = response.json()
                print(f"   [SUCCESS] Neural Link Active. Found {len(data)} existing leads in Ledger.")
                return True
            except:
                print("   [FAILED] URL is live but returned HTML instead of JSON. Did you remember to 'Deploy' as a New Deployment?")
                return False
        else:
            print(f"   [FAILED] Server returned: {response.text}")
            return False
            
    except Exception as e:
        print(f"   [CRITICAL] Link snapped: {e}")
        return False

if __name__ == "__main__":
    verify()
