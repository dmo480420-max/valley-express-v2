import os
import sys
import datetime
import json

# Ensure parent directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from logistics_sniper_pulse import LogisticsSniper

def test_run_volley():
    print("VALLEY EXPRESS: LAUNCHING TEST VOLLEY (5 LEADS)...")
    sniper = LogisticsSniper()

    test_leads = [
        {
            "title": "STAT: Medical Organ Transport - Banner Health to St. Joseph's",
            "source": "Medical Dispatch Portal",
            "requirements": "Time-sensitive organ transport. Temperature control required. Immediate pickup.",
            "est_pay": "350.00",
            "url": "https://valley-express.os/mission/med-001"
        },
        {
            "title": "Municipal Courier: City of Phoenix Document Filing",
            "source": "GovProcurement",
            "requirements": "Daily document run between City Hall and Superior Court. 12-month contract potential.",
            "est_pay": "45.00/hr",
            "url": "https://valley-express.os/mission/gov-442"
        },
        {
            "title": "Urgent AOG: Aircraft Part Delivery to Sky Harbor",
            "source": "Aviation Logistics Network",
            "requirements": "Pick up brake assembly at Mesa Gateway, deliver to Terminal 4. Urgent status.",
            "est_pay": "185.00",
            "url": "https://valley-express.os/mission/aero-99"
        },
        {
            "title": "General: IKEA Furniture Delivery - North Scottsdale",
            "source": "Craigslist",
            "requirements": "Small sofa delivery. Third floor, no elevator. Must bring own dolly.",
            "est_pay": "60.00",
            "url": "https://phoenix.craigslist.org/nph/etc/7721.html"
        },
        {
            "title": "B2B Route: Weekly Pharmacy Supply - Glendale Loop",
            "source": "PharmaLink",
            "requirements": "Standard pharmaceutical recurring route. Low security clearance required.",
            "est_pay": "550.00/week",
            "url": "https://valley-express.os/mission/pharma-loop"
        }
    ]

    for i, lead in enumerate(test_leads, 1):
        print(f"\n[TEST LEAD {i}/5] Injecting: {lead['title']}")
        # We manually set a truth score so it passes the first heuristic gate
        lead['truth_score'] = 95
        sniper.process_and_audit(lead)

    print("\nTEST VOLLEY COMPLETE. Check your Google Sheet (Jobs tab) and AppFlowy.")

if __name__ == "__main__":
    test_run_volley()
