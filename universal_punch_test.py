import requests
import json
import random

GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"

def run_universal_test():
    print("VALLEY EXPRESS: RUNNING UNIVERSAL PUNCH TEST...")
    
    # This lead includes every possible header name to ensure it catches your columns
    universal_lead = {
        "ID": f"MT-{random.randint(100, 999)}",
        "Job": f"JOB-{random.randint(100, 999)}",
        "Business Name": "UNIVERSAL_TEST_SUCCESS",
        "Company": "UNIVERSAL_TEST_SUCCESS",
        "Job Description": "AI Intelligence Sync Verification",
        "Title": "AI Intelligence Sync Verification",
        "Contact Email": "tech@valley-express.os",
        "Email": "tech@valley-express.os",
        "Phone": "602-555-TEST",
        "Telephone Number": "602-555-TEST",
        "Status": "NEW",
        "Priority": "URGENT",
        "Score": 100
    }

    payload = {
        "action": "bulkPush",
        "sheetName": "Marketing Targets",
        "data": [universal_lead]
    }

    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json=payload)
        print(f"Reply from Server: {response.text}")
    except Exception as e:
        print(f"Connection Error: {str(e)}")

if __name__ == "__main__":
    run_universal_test()
