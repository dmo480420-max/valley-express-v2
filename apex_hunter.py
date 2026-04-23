import os
import requests
import json
import time

# --- CONFIGURATION ---
GAS_URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"
DEEPSEEK_API_KEY = "sk-86d17dcc750043f992fd8ef655f5ce8d"

def get_leads():
    print("[APEX HUNTER] FETCHING TARGETS...")
    r = requests.get(GAS_URL, params={"action": "getSheetData", "sheetName": "Marketing Targets"})
    return [d for d in r.json() if d.get("Website") or d.get("Business Name")]

def deepseek_search(company_name, website):
    print(f"[NEURAL PROBE] ANALYZING: {company_name}")
    prompt = f"""
    Identify the 'Operations Manager', 'Logistics Manager', or 'Owner' for the company: {company_name} ({website}).
    Find their:
    1. Full Name
    2. Most Likely Email (or corporate contact format)
    3. Job Title
    
    Return ONLY JSON format:
    {{"name": "...", "email": "...", "title": "..."}}
    """
    
    try:
        r = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"},
            json={
                "model": "deepseek-chat",
                "messages": [{"role": "user", "content": prompt}]
            },
            timeout=30
        )
        content = r.json()['choices'][0]['message']['content'].strip()
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "{" in content and "}" in content:
             content = content[content.find("{"):content.rfind("}")+1]
        return json.loads(content)
    except Exception as e:
        print(f"Neural Probe Failed for {company_name}: {e}")
        return None

def update_lead(company_name, contact_data):
    data_to_push = {
        "Company": company_name,
        "Job Title": contact_data.get("title", ""),
        "Email": contact_data.get("email", ""),
        "Status": "CONTACT_FOUND"
    }
    
    requests.post(GAS_URL, data=json.dumps({
        "action": "bulkPush",
        "sheetName": "Marketing Targets",
        "data": [data_to_push]
    }))
    print(f"[LEDGER UPDATED] {company_name}: {contact_data.get('name')} ({contact_data.get('email')})")

def start_hunt():
    leads = get_leads()
    targets = [l for l in leads if l.get("Status") != "CONTACT_FOUND"][:3]
    
    for lead in targets:
        name = lead.get("Company") or lead.get("Business Name")
        site = lead.get("Website")
        contact = deepseek_search(name, site)
        if contact:
            update_lead(name, contact)
        time.sleep(1)

if __name__ == "__main__":
    start_hunt()
