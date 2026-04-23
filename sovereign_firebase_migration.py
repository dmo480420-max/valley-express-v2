import gspread
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os

# --- Sovereign Configuration ---
# PATHS: Update these if you place your JSONs elsewhere
SHEETS_CREDENTIALS_FILE = 'valley-express-platform/credentials/google_sheets_credentials.json'
FIREBASE_CREDENTIALS_FILE = 'valley-express-platform/credentials/firebase_credentials.json'

# Master Ledger Details (Targeting the Leads Tab for B2B Migration)
SHEET_ID = '1kDdR2jBoUeDxeLI6OxXXQckU5U7x6LG_hmZCex31IKY'
SHEET_NAME = 'Leads'  
FIRESTORE_COLLECTION = 'b2b_leads'

def execute_sovereign_migration():
    print("--------------------------------------------------")
    print(f"🔱 VALLEY EXPRESS: NEURAL CLOUD PIVOT")
    print(f"   Initalizing Migration: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("--------------------------------------------------")
    
    # Check for credentials before starting
    if not os.path.exists(SHEETS_CREDENTIALS_FILE) or not os.path.exists(FIREBASE_CREDENTIALS_FILE):
        print("❌ CRITICAL ERROR: Credential files not found.")
        print(f"   Missing Sheets: {not os.path.exists(SHEETS_CREDENTIALS_FILE)}")
        print(f"   Missing Firebase: {not os.path.exists(FIREBASE_CREDENTIALS_FILE)}")
        print("   Please place 'google_sheets_credentials.json' and 'firebase_credentials.json'")
        print("   into the 'valley-express-platform/credentials/' directory.")
        return

    try:
        # 1. Initialize Google Sheets Bridge
        print("📡 Establishing Google Sheets Bridge...")
        gc = gspread.service_account(filename=SHEETS_CREDENTIALS_FILE)
        worksheet = gc.open_by_key(SHEET_ID).worksheet(SHEET_NAME)
        leads_data = worksheet.get_all_records()
        
        print(f"🎯 Connection Secure: {len(leads_data)} records detected in '{SHEET_NAME}'.")

        # 2. Initialize Firebase Truth Engine
        print("🔥 Igniting Firebase Truth Engine...")
        if not firebase_admin._apps:
            cred = credentials.Certificate(FIREBASE_CREDENTIALS_FILE)
            firebase_admin.initialize_app(cred)
        db = firestore.client()

        # 3. Data Pivot
        print(f"🚀 Pushing {len(leads_data)} leads to collection: '{FIRESTORE_COLLECTION}'...")
        success_count = 0
        update_count = 0
        
        for lead in leads_data:
            # Map Sheet Headers to strict Firestore Schema
            # Note: headers in Sheets are often Title Case (e.g. 'Company')
            doc_data = {
                'company': str(lead.get('Company', 'N/A')),
                'job_title': str(lead.get('Job Title', 'N/A')),
                'email': str(lead.get('Email', 'N/A')),
                'phone': str(lead.get('Telephone Number', 'N/A')),
                'type': str(lead.get('Type', 'B2B')),
                'zone': str(lead.get('Zone', 'Phoenix Core')),
                'status': str(lead.get('Status', 'New')),
                'ai_scrutiny': str(lead.get('AI Scrutiny', '0')),
                'last_synced': firestore.SERVER_TIMESTAMP,
                'sovereign_flag': True if "Verified" in str(lead.get('Status', '')) else False
            }
            
            # Deterministic ID for deduplication (Company + Phone)
            sanitized_company = "".join(filter(str.isalnum, doc_data['company'].lower()))
            sanitized_phone = "".join(filter(str.isdigit, doc_data['phone']))
            unique_id = f"lead_{sanitized_company}_{sanitized_phone}" if sanitized_phone else f"lead_{sanitized_company}_{hash(doc_data['email'])}"
            
            doc_ref = db.collection(FIRESTORE_COLLECTION).document(unique_id)
            doc_ref.set(doc_data, merge=True)
            success_count += 1
            
            if (success_count % 5 == 0):
                print(f"   Progress: {success_count}/{len(leads_data)} records projected.")

        print("--------------------------------------------------")
        print(f"✅ NEURAL PIVOT COMPLETE")
        print(f"   Status: {success_count} Leads live in Firestore.")
        print(f"   Collection: {FIRESTORE_COLLECTION}")
        print("--------------------------------------------------")

    except Exception as e:
        print(f"❌ SOVEREIGN FAILURE: {str(e)}")

if __name__ == "__main__":
    execute_sovereign_migration()
