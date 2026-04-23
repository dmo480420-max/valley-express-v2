import os
from apify_client import ApifyClient
from dotenv import load_dotenv

# Force reload
load_dotenv(override=True)

token = os.getenv("APIFY_TOKEN")
print(f"DEBUG: Token starts with '{token[:10]}...' and length is {len(token) if token else 0}")

client = ApifyClient(token)

try:
    user = client.user().get()
    print("SUCCESS: Connected to Apify Account:", user.get("username"))
except Exception as e:
    print("FAILURE: Apify Handshake Error:", str(e))
