import os
import requests
from dotenv import load_dotenv

# Force load from specific location
env_path = os.path.abspath(os.path.join(os.getcwd(), "valley-express-platform", ".env"))
print(f"DEBUG: Looking for .env at {env_path}")
load_dotenv(env_path)

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

print(f"DEBUG: TOKEN FOUND: {'YES' if NOTION_TOKEN else 'NO'}")
print(f"DEBUG: DATABASE_ID: {DATABASE_ID}")

if NOTION_TOKEN and DATABASE_ID:
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}"
    headers = {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": "2022-06-28"
    }
    res = requests.get(url, headers=headers)
    print(f"DEBUG: DATABASE ACCESS STATUS: {res.status_code}")
    if res.status_code == 200:
        print(f"DEBUG: DATABASE NAME: {res.json().get('title', [{}])[0].get('plain_text', 'Unknown')}")
