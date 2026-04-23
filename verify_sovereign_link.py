import os
import requests
import json
from dotenv import load_dotenv

# Load Sovereign Environment
load_dotenv()

def verify_aletheia():
    print("--- [1/3] VERIFYING ALETHEIA (DEEPSEEK) ---")
    api_key = os.getenv("DEEPSEEK_API_KEY")
    url = "https://api.deepseek.com/chat/completions"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": "Ping"}],
        "max_tokens": 5
    }
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        if response.status_code == 200:
            print("[OK] ALETHEIA: ONLINE. DeepSeek-V3 handshake successful.")
        else:
            print(f"[FAIL] ALETHEIA: FAILED. Status: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"[ERROR] ALETHEIA: EXCEPTION. {e}")

def verify_sniper():
    print("\n--- [2/3] VERIFYING SNIPER (APIFY) ---")
    token = os.getenv("APIFY_TOKEN")
    url = "https://api.apify.com/v2/users/me"
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json().get('data', {})
            print(f"[OK] SNIPER: ONLINE. Connected as: {data.get('username')}")
        else:
            print(f"[FAIL] SNIPER: FAILED. Status: {response.status_code}")
    except Exception as e:
        print(f"[ERROR] SNIPER: EXCEPTION. {e}")

def verify_firebase():
    print("\n--- [3/3] VERIFYING FIREBASE (FIRESTORE) ---")
    # Using the keys from neural_cloud_sync.py
    project_id = "valley-express-os"
    api_key = "AIzaSyDVzuXl5kVPbh0ErE0nOk3eJ7cOYVPjCGo"
    url = f"https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents/diagnostic_checks?key={api_key}"
    
    # Attempt to write a test document
    payload = {
        "fields": {
            "status": {"stringValue": "V2_READY"},
            "timestamp": {"timestampValue": "2026-04-20T00:00:00Z"}
        }
    }
    try:
        response = requests.post(url, json=payload, timeout=10)
        if response.status_code == 200 or response.status_code == 403: 
            if response.status_code == 200:
                print("[OK] FIREBASE: ONLINE. Write test successful.")
            else:
                print("[WARN] FIREBASE: REACHABLE but Write Restricted (Expected for some restricted keys).")
        else:
            print(f"[FAIL] FIREBASE: FAILED. Status: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"[ERROR] FIREBASE: EXCEPTION. {e}")

if __name__ == "__main__":
    verify_aletheia()
    verify_sniper()
    verify_firebase()
