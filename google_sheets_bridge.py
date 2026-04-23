import requests
import json
import time
import os
from datetime import datetime

# CONFIGURATION (Loaded from .env.local pattern)
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"
FIRESTORE_PROJECT_ID = "valley-express-os" # Your project ID

def fetch_leads_from_firestore():
    """Fetches the latest marketing leads from your local cloud."""
    print("Polling Firestore for Marketing Leads...")
    url = f"https://firestore.googleapis.com/v1/projects/{FIRESTORE_PROJECT_ID}/databases/(default)/documents/leads"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            docs = response.json().get('documents', [])
            leads = []
            for doc in docs:
                fields = doc.get('fields', {})
                leads.append({
                    "Email": fields.get('email', {}).get('stringValue', 'N/A'),
                    "Telephone Number": fields.get('phone', {}).get('stringValue', 'N/A'),
                    "Done": "No",
                    "Job Title": fields.get('job_title', {}).get('stringValue', 'Lead'),
                    "Firebase": "Live",
                    "Notes": fields.get('notes', {}).get('stringValue', 'Auto-Synced'),
                    "Company": fields.get('company', {}).get('stringValue', 'Unassigned')
                })
            return leads
    except Exception as e:
        print(f"Error: {e}")
    return []

def push_to_google_sheets(leads):
    """Pushes data to the Google Apps Script Backend."""
    if not leads:
        print("No new leads to push.")
        return

    print(f"Pushing {len(leads)} leads to Google Sheets...")
    payload = {
        "action": "bulkPush",
        "sheetName": "Marketing Targets", 
        "data": leads
    }

    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json=payload, allow_redirects=True, timeout=15)
        print(f"Cloud Response: {response.text}")
    except Exception as e:
        print(f"Cloud Push Error: {e}")

def run_bridge():
    """Main loop for the Pulse Sync."""
    print("Valley Express: Google Sheets Bridge Activated.")
    print(f"URL: {GOOGLE_SCRIPT_URL}")
    
    while True:
        leads = fetch_leads_from_firestore()
        if leads:
            push_to_google_sheets(leads)
        
        print("Resting for 60 seconds...")
        time.sleep(60)

if __name__ == "__main__":
    run_bridge()
