import os
import sys
import datetime
import requests
import json
import random

# Configuration
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"

def run_crm_test():
    print("VALLEY EXPRESS: RUNNING CRM DUMMY TEST (TARGET: MARKETING TARGETS)...")
    
    test_targets = [
        {
            "ID": f"MT-{random.randint(200, 999)}",
            "Business Name": "Banner Health Logistics Center",
            "Phone": "602-555-0199",
            "Address": "1111 E McDowell Rd",
            "City": "Phoenix",
            "State": "AZ",
            "Website": "bannerhealth.com",
            "Type": "Medical",
            "Contact Email": "logistics@bannerhealth.com",
            "Lead": "Govt/B2B",
            "Status": "NEW",
            "Priority": "URGENT",
            "Score": 98,
            "Firebase ID": "TEST-MT-001"
        },
        {
            "ID": f"MT-{random.randint(200, 999)}",
            "Business Name": "Maricopa Health Lab",
            "Phone": "602-555-4433",
            "Address": "2601 E Roosevelt St",
            "City": "Phoenix",
            "State": "AZ",
            "Website": "maricopa.gov",
            "Type": "Medical",
            "Contact Email": "lab_dispatch@maricopa.gov",
            "Lead": "B2B",
            "Status": "NEW",
            "Priority": "High",
            "Score": 92,
            "Firebase ID": "TEST-MT-002"
        }
    ]

    payload = {
        "action": "bulkPush",
        "sheetName": "Marketing Targets",
        "data": test_targets
    }

    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json=payload)
        if response.status_code == 200:
            print(f"   [SYNC] 2 Targets Injected into Marketing Targets Ledger.")
        else:
            print(f"   [ERROR] CRM Test Failed: {response.text}")
    except Exception as e:
        print(f"   [ERROR] CRM Test Exception: {str(e)}")

if __name__ == "__main__":
    run_crm_test()
