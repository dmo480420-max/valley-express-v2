import requests
import os
import json
from dotenv import load_dotenv

load_dotenv()
NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}

def get_props():
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}"
    res = requests.get(url, headers=HEADERS)
    if res.status_code == 200:
        props = res.json().get("properties", {})
        print("\n=== NOTION DATABASE SCHEMA DETECTED ===")
        for name, data in props.items():
            print(f"- {name} ({data['type']})")
        print("=======================================\n")
    else:
        print(f"Error: {res.status_code} - {res.text}")

if __name__ == "__main__":
    get_props()
