import sys
import os
import time
import requests
import json
from dotenv import load_dotenv

# Add root project path to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform")))

# Load Env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform", ".env"))

# Import DeepSeek for drafting (Absolute Load)
import importlib.util
worker_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "valley-express-platform", "scrapers", "python", "deepseek_worker.py"))
spec = importlib.util.spec_from_file_location("deepseek_worker", worker_path)
ds_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ds_module)
process_generic = ds_module.process_generic

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

def verify_single_draft():
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    query = {
        "filter": {
            "property": "Name",
            "title": {"equals": "Haas Medical"}
        }
    }
    res = requests.post(url, headers=HEADERS, json=query)
    results = res.json().get("results", [])
    if not results:
        print("COULD NOT FIND HAAS MEDICAL.")
        return
    
    page = results[0]
    page_id = page["id"]
    name = "Haas Medical"
    category = "Medical"
    
    print(f"--- [SURGICAL TEST] DRAFTING FOR {name} ---")
    prompt = f"Draft a professional cold email for {name} in {category} logistics. Focus on HIPAA and refrigeration."
    draft = process_generic(prompt, system_instruct="B2B Logistics Agent")
    
    print(f"DRAFT GENERATED: {draft[:100]}...")
    
    update_url = f"https://api.notion.com/v1/pages/{page_id}"
    payload = {
        "properties": {
            "Notes": {
                "rich_text": [{"text": {"content": draft}}]
            }
        }
    }
    patch_res = requests.patch(update_url, headers=HEADERS, json=payload)
    print(f"NOTION UPDATE STATUS: {patch_res.status_code}")

if __name__ == "__main__":
    verify_single_draft()
