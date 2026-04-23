import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

class GoogleMapsSniper:
    def __init__(self):
        # Using the key from your sovereign scripts
        self.api_key = "AIzaSyDVzuXl5kVPbh0ErE0nOk3eJ7cOYVPjCGo"
        self.url = "https://places.googleapis.com/v1/places:searchText"
        
    def hunt_leads(self, query, location="Phoenix, AZ"):
        print(f"   [GOOGLE SEARCH] Hunting: '{query}' in {location}...")
        
        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": self.api_key,
            "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.types,places.websiteUri"
        }
        
        payload = {
            "textQuery": f"{query} in {location}",
            "maxResultCount": 10
        }
        
        try:
            response = requests.post(self.url, json=payload, headers=headers)
            if response.status_code == 200:
                results = response.json().get('places', [])
                leads = []
                for p in results:
                    leads.append({
                        "company": p.get('displayName', {}).get('text', 'N/A'),
                        "address": p.get('formattedAddress', 'N/A'),
                        "phone": p.get('nationalPhoneNumber', 'N/A'),
                        "website": p.get('websiteUri', 'N/A'),
                        "source": "Google Maps Sniper",
                        "industry": query
                    })
                return leads
            else:
                print(f"   [ERROR] Google Search Failed: {response.status_code} - {response.text}")
                return []
        except Exception as e:
            print(f"   [ERROR] Google Search Exception: {e}")
            return []

if __name__ == "__main__":
    sniper = GoogleMapsSniper()
    test_leads = sniper.hunt_leads("Dialysis Clinic")
    print(json.dumps(test_leads, indent=2))
