import requests
import json
import csv
import os

URL = "https://script.google.com/macros/s/AKfycbwRfUd8NPj7UDODRCuXqQkKeIHtWjM_LUNKkX9XgAbO2uIBiHyvfWkdj4pGRnsCbUWcSg/exec"

def extract_and_format():
    print(f"--- [PORTFOLIO EXTRACTION] FETCHING MASTER LEDGER ---")
    
    try:
        # Fetching Marketing Targets
        test_url = f"{URL}?action=getSheetData&sheetName=Marketing Targets"
        response = requests.get(test_url, timeout=15)
        
        if response.status_code == 200:
            leads = response.json()
            print(f"   Successfully retrieved {len(leads)} B2B Nodes.")
            
            # Format according to user request
            # Format: Company | Phone | Address | URL | Category | Status | Score
            
            formatted_list = []
            for l in leads:
                # Cleaning up data for the requested layout
                company = l.get("Company", "N/A")
                phone = l.get("Telephone Number", l.get("Phone", ""))
                address = l.get("Address", "")
                url = l.get("URL", l.get("Website", ""))
                category = l.get("Type", l.get("Job Title", "Logistics"))
                status = l.get("Status", "NEW")
                score = l.get("AI Scrutiny", l.get("Score", "90"))
                
                line = f"{company}\t{phone}\t{address}\t{url}\t{category}\t{status}\t{score}"
                formatted_list.append(line)
            
            # Output to a clear file
            with open("VALLEY_EXPRESS_PORTFOLIO.txt", "w", encoding='utf-8') as f:
                f.write("\n".join(formatted_list))
            
            print(f"   [SUCCESS] Portfolio formatted in VALLEY_EXPRESS_PORTFOLIO.txt")
        else:
            print(f"   [FAILED] Server Error: {response.text}")
    except Exception as e:
        print(f"   [CRITICAL] Error: {str(e)}")

if __name__ == "__main__":
    extract_and_format()
