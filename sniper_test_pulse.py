import os
import sys

# Ensure parent directory is in path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from logistics_sniper_pulse import LogisticsSniper

if __name__ == "__main__":
    print("LOGISTICS SNIPER: INITIATING TEST PULSE...")
    sniper = LogisticsSniper()
    try:
        sniper.run_pulse()
        print("\nTEST PULSE COMPLETED. CHECK YOUR MASTER LEDGER.")
    except Exception as e:
        print(f"\nTEST PULSE FAILED: {str(e)}")
