import os
import requests
import json
from bs4 import BeautifulSoup
from datetime import datetime
from dotenv import load_dotenv
from deepseek_worker import DeepSeekExtractor

# Load environment configuration
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '.env.local'))

SCRIPT_URL = os.getenv("NEXT_PUBLIC_GOOGLE_SCRIPT_URL")

# AZ Cities to target for local logistics contracts
AZ_CITIES = [
    {"name": "Arizona APP", "url": "https://app.az.gov/page.aspx/en/rfp/request_browse_public"},
    {"name": "Phoenix OpenGov", "url": "https://procurement.opengov.com/portal/phoenix"},
    {"name": "ADOT Construction", "url": "https://azdot.gov/business/contracts-and-specifications/current-advertisements"},
    {"name": "SAM.gov AZ", "url": "https://sam.gov/search/?index=opp&page=1&sort=-modifiedDate&mode=search&is_active=true&notice_type=r,p,k&state=AZ&q=logistics"}
]

def clean_html(html_content):
    """Strip noise while preserving key data."""
    soup = BeautifulSoup(html_content, "html.parser")
    # Remove scripts, styles, and footers
    for element in soup(["script", "style", "footer", "header", "nav"]):
        element.decompose()
    return soup.get_text(separator="\n", strip=True)

def push_to_ledger(leads):
    """Push structured JSON leads to Google Apps Script."""
    if not leads or not SCRIPT_URL:
        return
    
    print(f"Dispatching {len(leads)} leads to Master Ledger...")
    try:
        payload = {
            "action": "bulkPush",
            "sheetName": "Gov Bids",
            "data": [
                {
                    "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "Agency": lead.get("agency", "Unknown"),
                    "Title": lead.get("title", "No Title"),
                    "Contract ID": lead.get("contract_id", "N/A"),
                    "Deadline": lead.get("deadline", "Unknown"),
                    "Reply Link": lead.get("reply_link", ""),
                    "Phone": lead.get("phone", ""),
                    "Summary": lead.get("requirements_summary", "")
                }
                for lead in leads
            ]
        }
        
        response = requests.post(SCRIPT_URL, json=payload)
        if response.status_code == 200:
            print("Ledger Update SUCCESS.")
        else:
            print(f"Ledger Update FAILED: {response.text}")
            
    except Exception as e:
        print(f"Error pushing to ledger: {e}")

def get_content_hash(text):
    import hashlib
    return hashlib.md5(text.encode('utf-8')).hexdigest()

def run_sovereign_ingest():
    """Main Ingestion Loop with Cache Optimization."""
    print(f"VALLEY EXPRESS - STARTING OPTIMIZED INGEST - {datetime.now()}")
    extractor = DeepSeekExtractor()
    
    # Load cache
    cache_path = os.path.join(os.path.dirname(__file__), 'ingest_cache.json')
    if os.path.exists(cache_path):
        with open(cache_path, 'r') as f:
            cache = json.load(f)
    else:
        cache = {}

    total_new_leads = 0
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    })
    
    for city in AZ_CITIES:
        print(f"Checking {city['name']}...")
        try:
            response = session.get(city['url'], timeout=15)
            if response.status_code == 200:
                clean_text = clean_html(response.text)
                new_hash = get_content_hash(clean_text)

                if cache.get(city['name']) == new_hash:
                    print(f"Skipping {city['name']} (No updates detected).")
                    continue

                leads = extractor.extract_leads(clean_text)
                
                if leads:
                    print(f"Success: Found {len(leads)} opportunities in {city['name']}.")
                    push_to_ledger(leads)
                    total_new_leads += len(leads)
                
                # Update cache
                cache[city['name']] = new_hash
            else:
                print(f"Warning: Failed to reach {city['name']} (Status: {response.status_code})")
                
        except Exception as e:
            print(f"Error scraping {city['name']}: {e}")

    # Save cache
    with open(cache_path, 'w') as f:
        json.dump(cache, f)

    print(f"MISSION COMPLETE. Ingested: {total_new_leads}")

if __name__ == "__main__":
    run_sovereign_ingest()
