#!/usr/bin/env python3
"""CLI agent to list drivers expiring certifications."""
import json
from datetime import datetime, timedelta

# Mock data – replace with Firestore query later
drivers = [
    {"id": "d1", "name": "John", "twic_expiry": "2026-12-01", "hazmat_expiry": "2026-10-15", "bloodborne_expiry": "2026-11-20"},
    {"id": "d2", "name": "Maria", "twic_expiry": "2026-05-01", "hazmat_expiry": "2026-04-15", "bloodborne_expiry": "2026-04-10"},
]

today = datetime.utcnow().date()
warning_window = today + timedelta(days=60)

print("--- [AGENT 7: FLEET AUDIT] COMMENCING COMPLIANCE CHECK ---")

for d in drivers:
    issues = []
    for cert, expiry_str in [("twic", d["twic_expiry"]), ("hazmat", d["hazmat_expiry"]), ("bloodborne", d["bloodborne_expiry"])]:
        expiry = datetime.strptime(expiry_str, "%Y-%m-%d").date()
        if expiry < today:
            issues.append(f"{cert} EXPIRED on {expiry_str}")
        elif expiry < warning_window:
            issues.append(f"{cert} expires soon: {expiry_str}")
    if issues:
        print(f"⚠️ Driver {d['name']} ({d['id']}): {', '.join(issues)}")
    else:
        print(f"✅ Driver {d['name']} fully compliant")
