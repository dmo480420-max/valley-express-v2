import requests
import os

# Configuration from .env.local
SCRIPTS_URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"

def send_sample_email():
    payload = {
        "action": "testEmail"
    }
    
    print("Triggering sample email via Google Apps Script...")
    try:
        response = requests.post(SCRIPTS_URL, json=payload)
        if response.status_code == 200:
            print(f"DONE: {response.text}")
        else:
            print(f"FAILED: HTTP {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    send_sample_email()
