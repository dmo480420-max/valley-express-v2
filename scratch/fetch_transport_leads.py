import requests
import xml.etree.ElementTree as ET
import json
import os
import sys

def fetch_az_contracts():
    rss_url = "https://app.az.gov/rss/bids"
    try:
        response = requests.get(rss_url, timeout=10)
        xml_data = response.text
        root = ET.fromstring(xml_data)
        
        items = root.findall('.//item')
        print(f"Total items found: {len(items)}")
        
        transport_leads = []
        # Expanded keywords to match "transport and delivery"
        keywords = ["transport", "delivery", "courier", "freight", "logistics", "moving", "hauling", "ambulance", "cargo", "messenger"]
        
        for item in items:
            title = item.find('title').text
            link = item.find('link').text
            title_lower = title.lower()
            
            if any(k in title_lower for k in keywords):
                transport_leads.append({
                    "title": title,
                    "link": link,
                    "source": "AZ State RSS"
                })
        
        print(f"Found {len(transport_leads)} transport-related leads.")
        for i, lead in enumerate(transport_leads, 1):
            print(f"{i}. {lead['title']}")
            
        return transport_leads
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    leads = fetch_az_contracts()
    # Save to a JSON for Aletheia verification
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "transport_leads_audit.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(leads, f, indent=4)
    print(f"Saved to {output_path}")
