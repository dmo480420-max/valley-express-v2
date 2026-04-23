import json
import os

db_path = "data/jobs_ledger.json"

new_leads = [
    {
        "company_name": "Banner University Med Center",
        "pickup_address": "Downtown Phoenix",
        "dropoff_address": "Gilbert",
        "pickup_zone": "Downtown Phoenix",
        "dropoff_zone": "Gilbert",
        "industry": "Medical",
        "miles": 24,
        "rate": 250,
        "rpm": 10.42,
        "driver_payout": 175,
        "profit": 75,
        "priority": "HOT",
        "assigned_driver_id": "PENDING",
        "status": "available",
        "title": "STAT Organ Transport - Life-Safety",
        "id": "VEX-V3-9901",
        "created_at": "2026-04-19T00:21:00"
    },
    {
        "company_name": "TSMC Phoenix Site",
        "pickup_address": "North Phoenix",
        "dropoff_address": "Chandler",
        "pickup_zone": "Phoenix North",
        "dropoff_zone": "Chandler",
        "industry": "Semiconductor",
        "miles": 38,
        "rate": 450,
        "rpm": 11.84,
        "driver_payout": 315,
        "profit": 135,
        "priority": "HOT",
        "assigned_driver_id": "PENDING",
        "status": "available",
        "title": "Precision Tooling - Cleanroom Secure",
        "id": "VEX-V3-9902",
        "created_at": "2026-04-19T00:21:05"
    },
    {
        "company_name": "Mayo Clinic Hospital",
        "pickup_address": "North Scottsdale",
        "dropoff_address": "Phoenix Lab",
        "pickup_zone": "Scottsdale",
        "dropoff_zone": "Downtown Phoenix",
        "industry": "Medical",
        "miles": 15,
        "rate": 180,
        "rpm": 12.0,
        "driver_payout": 126,
        "profit": 54,
        "priority": "HOT",
        "assigned_driver_id": "PENDING",
        "status": "available",
        "title": "Emergency Specimen Route",
        "id": "VEX-V3-9903",
        "created_at": "2026-04-19T00:21:10"
    },
    {
        "company_name": "Intel Ocotillo Campus",
        "pickup_address": "Chandler",
        "dropoff_address": "Sky Harbor Air Cargo",
        "pickup_zone": "Chandler",
        "dropoff_zone": "Downtown Phoenix",
        "industry": "Semiconductor",
        "miles": 18,
        "rate": 320,
        "rpm": 17.78,
        "driver_payout": 224,
        "profit": 96,
        "priority": "HOT",
        "assigned_driver_id": "PENDING",
        "status": "available",
        "title": "Critical Silicon Wafer Batch",
        "id": "VEX-V3-9904",
        "created_at": "2026-04-19T00:21:15"
    },
    {
        "company_name": "Phoenix Children's Hospital",
        "pickup_address": "Central Phoenix",
        "dropoff_address": "Glendale Pharmacy",
        "pickup_zone": "Downtown Phoenix",
        "dropoff_zone": "Glendale",
        "industry": "Medical",
        "miles": 12,
        "rate": 195,
        "rpm": 16.25,
        "driver_payout": 136.5,
        "profit": 58.5,
        "priority": "HOT",
        "assigned_driver_id": "PENDING",
        "status": "available",
        "title": "Life-Safety Pharmacy Rush",
        "id": "VEX-V3-9905",
        "created_at": "2026-04-19T00:21:20"
    },
    {
        "company_name": "Arizona State Capitol",
        "pickup_address": "Government District",
        "dropoff_address": "Scottsdale Archive",
        "pickup_zone": "Downtown Phoenix",
        "dropoff_zone": "Scottsdale",
        "industry": "Legal",
        "miles": 20,
        "rate": 140,
        "rpm": 7.0,
        "driver_payout": 98,
        "profit": 42,
        "priority": "NORMAL",
        "assigned_driver_id": "PENDING",
        "status": "available",
        "title": "Secure Legal Archive Courier",
        "id": "VEX-V3-9906",
        "created_at": "2026-04-19T00:21:25"
    }
]

if os.path.exists(db_path):
    with open(db_path, 'r', encoding='utf-8') as f:
        jobs = json.load(f)
else:
    jobs = []

jobs.extend(new_leads)

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(jobs, f, indent=2)

print(f"Successfully added {len(new_leads)} leads to {db_path}")
