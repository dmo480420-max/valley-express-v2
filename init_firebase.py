import os
import json
import datetime
import random

def init_firebase_schema_v3():
    """
    Initializes the Firebase local truth ledger (v3) for Valley Express.
    Follows the exact schema requested in Backend Automation System (Part 3).
    """
    data_dir = "data"
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    # 1. DRIVERS COLLECTION
    drivers = [
        {
            "id": "DRV-SUN-08",
            "name": "Alex Rivera",
            "phone": "602-555-0101",
            "vehicle_type": "Sprinter Van",
            "current_zone": "Downtown Phoenix",
            "status": "online",
            "rating": 4.99,
            "active_load": 0
        },
        {
            "id": "DRV-SUN-09",
            "name": "Jordan Smith",
            "phone": "480-555-0202",
            "vehicle_type": "Box Truck",
            "current_zone": "Tempe",
            "status": "online",
            "rating": 4.85,
            "active_load": 0
        },
        {
            "id": "DRV-SUN-10",
            "name": "Maria Garcia",
            "phone": "623-555-0303",
            "vehicle_type": "Cargo Van",
            "current_zone": "Glendale",
            "status": "online",
            "rating": 4.92,
            "active_load": 1
        }
    ]

    # 2. SHIPPERS COLLECTION
    shippers = [
        {
            "id": "SHIP-001",
            "company_name": "Banner Health",
            "contact_name": "Sarah Miller",
            "phone": "602-555-9000",
            "industry": "Medical",
            "location_zone": "Downtown Phoenix",
            "contract_status": "Active"
        },
        {
            "id": "SHIP-002",
            "company_name": "Maricopa County Superior Court",
            "contact_name": "Jim Thorne",
            "phone": "602-555-1234",
            "industry": "Legal",
            "location_zone": "Downtown Phoenix",
            "contract_status": "Active"
        }
    ]

    # 3. CONTRACTS COLLECTION
    contracts = [
        {
            "company_name": "Banner Health",
            "industry": "Medical",
            "zone": "Downtown Phoenix",
            "contract_type": "daily",
            "avg_loads_per_week": 15,
            "agreed_rate": 45.00,
            "status": "Active"
        }
    ]

    # Save to local mock DB
    with open(os.path.join(data_dir, "drivers.json"), 'w', encoding='utf-8') as f:
        json.dump(drivers, f, indent=2)
    with open(os.path.join(data_dir, "shippers.json"), 'w', encoding='utf-8') as f:
        json.dump(shippers, f, indent=2)
    with open(os.path.join(data_dir, "contracts.json"), 'w', encoding='utf-8') as f:
        json.dump(contracts, f, indent=2)
    # Jobs ledger starts empty or with old data
    if not os.path.exists(os.path.join(data_dir, "jobs_ledger.json")):
        with open(os.path.join(data_dir, "jobs_ledger.json"), 'w', encoding='utf-8') as f:
            json.dump([], f, indent=2)

    print("VALLEY EXPRESS (V3): Firebase Local Schema Initialized.")
    print(f"   [DRIVERS] {len(drivers)} Online pilots positioned.")
    print(f"   [SHIPPERS] {len(shippers)} Verified shippers mapped.")
    print(f"   [CONTRACTS] {len(contracts)} Institutional contracts active.")

if __name__ == "__main__":
    init_firebase_schema_v3()
