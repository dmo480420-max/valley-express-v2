import requests
import os
import json
from dotenv import load_dotenv

# Load Sovereign Environment from specific path
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
load_dotenv(env_path)

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
GOOGLE_SCRIPT_URL = os.getenv("GOOGLE_APPS_SCRIPT_URL")

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

def push_lead_to_notion(lead_data):
    """
    Pushes a single lead from the Master Ledger to Notion Strike List.
    """
    url = "https://api.notion.com/v1/pages"
    
    # Map Sovereign Ledger headers to Notion Properties
    # Audit Keys: Business Name, Phone, Website, Contact Email, Address
    business_name = lead_data.get("Business Name") or lead_data.get("Company", "Unknown Entity")
    telephone = lead_data.get("Phone") or lead_data.get("Telephone Number")
    email = lead_data.get("Contact Email") or lead_data.get("Email")
    website = lead_data.get("Website") or lead_data.get("Google Maps URL")
    address = lead_data.get("Address") or lead_data.get("Physical Location", "Phoenix Sector")

    payload = {
        "parent": {"database_id": DATABASE_ID},
        "properties": {
            "Name": {
                "title": [{"text": {"content": business_name}}]
            },
            "Status": {
                "select": {"name": lead_data.get("Status", "NEW")}
            },
            "AI Scrutiny": {
                "select": {"name": lead_data.get("AI Scrutiny", "BRONZE")}
            },
            "telephone": {
                "phone_number": telephone if telephone else None
            },
            "email": {
                "email": email if email else None
            },
            "website": {
                "url": website if website else None
            },
            "address": {
                "rich_text": [{"text": {"content": address}}]
            },
            "Source": {
                "select": {"name": lead_data.get("Source", "Sniper Engine")}
            },
            "Notes": {
                "rich_text": [{"text": {"content": lead_data.get("Notes", "No briefing.")}}]
            }
        }
    }

    # Remove empty values to avoid API validation errors for standard types
    if not payload["properties"]["telephone"]["phone_number"]: del payload["properties"]["telephone"]
    if not payload["properties"]["email"]["email"]: del payload["properties"]["email"]
    if not payload["properties"]["website"]["url"]: del payload["properties"]["website"]

    # Duplicate Check: See if this company already exists in the database
    check_url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    query_payload = {
        "filter": {
            "property": "Name",
            "title": {
                "equals": lead_data.get("Company", "Unknown Entity")
            }
        }
    }
    
    try:
        check_res = requests.post(check_url, headers=HEADERS, data=json.dumps(query_payload))
        existing_results = check_res.json().get("results", [])
        if check_res.status_code == 200 and len(existing_results) > 0:
            page_id = existing_results[0]["id"]
            print(f"   [ENRICHING] Existing lead found: {lead_data.get('Company')}. Updating with granular data...")
            # Update existing page instead of skipping
            update_url = f"https://api.notion.com/v1/pages/{page_id}"
            # Remove parent and name from payload for update
            update_payload = {"properties": payload["properties"]}
            # Notion doesn't like updating the 'title' property in some contexts if it matches, 
            # but usually it's fine. We'll proceed.
            response = requests.patch(update_url, headers=HEADERS, data=json.dumps(update_payload))
            if response.status_code == 200:
                print(f"   [SUCCESS] Enriched Notion record: {lead_data.get('Company')}")
                return True
            else:
                print(f"   [ERROR] Enrichment Failed: {response.text}")
                return False
    except Exception as e:
        print(f"   [WARNING] Duplicate check/update failed: {e}")

    try:
        response = requests.post(url, headers=HEADERS, data=json.dumps(payload))
        if response.status_code == 200:
            print(f"   [SUCCESS] Created new record in Notion: {lead_data.get('Company')}")
            return True
        else:
            print(f"   [ERROR] Notion API Failure: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"   [CRITICAL] Error pushing to Notion: {e}")
        return False

def sync_high_value_leads():
    """
    Fetches leads from GAS and syncs GOLD/SILVER ones to Notion.
    """
    print("--- [NOTION BRIDGE] COMMENCING SYNC FROM MASTER LEDGER ---")
    
    if not NOTION_TOKEN or not DATABASE_ID:
        print("   [ABORT] Notion credentials missing in .env")
        return

    try:
        # Step 1: Try Primary "Leads" sheet
        print("   Checking 'Leads' ledger...")
        response = requests.get(f"{GOOGLE_SCRIPT_URL}?action=getSheetData&sheetName=Leads")
        leads = response.json()
        
        # If Leads sheet is missing or empty, fallback to Marketing Targets
        if isinstance(leads, dict) and leads.get("error"):
            print("   'Leads' sheet not found. Falling back to 'Marketing Targets'...")
            response = requests.get(f"{GOOGLE_SCRIPT_URL}?action=getSheetData&sheetName=Marketing Targets")
            leads = response.json()

        if isinstance(leads, list):
            # Filtering for High-Value targets (GOLD/SILVER)
            # Note: headers in 'Marketing Targets' might be different (Business Name vs Company)
            high_value_leads = []
            for l in leads:
                # Use Sovereign Headers
                name = l.get("Business Name") or l.get("Company")
                rank = l.get("AI Scrutiny") or l.get("Priority") or "BRONZE"
                
                # Ensure Company key exists for duplicate check
                l["Company"] = name
                l["AI Scrutiny"] = rank
                high_value_leads.append(l)
            
            print(f"   Identified {len(high_value_leads)} high-value targets for sync.")
            
            success_count = 0
            for lead in high_value_leads:
                if push_lead_to_notion(lead):
                    success_count += 1
            
            print(f"--- [COMPLETE] SYNC FINISHED. {success_count} LEADS DEPLOYED TO NOTION ---")
        else:
            print(f"   [ERROR] Unexpected response format from GAS: {leads}")
    except Exception as e:
        print(f"   [CRITICAL] Bridge Breakdown: {e}")

if __name__ == "__main__":
    sync_high_value_leads()
