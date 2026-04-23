import time
import datetime
from sync_engine import SmartSyncEngineV3
import json
import os

def run_realtime_sync():
    """
    Sovereign Real-Time Dispatch Sentinel.
    Monitors the jobs_ledger.json (simulating a live firestore listener) 
    and updates the AppFlowy Master Template instantly.
    """
    engine = SmartSyncEngineV3()
    ledger_path = engine.db_jobs
    
    print("🔱 VALLEY EXPRESS | NEURAL DISPATCH SENTINEL: ACTIVE")
    print(f"Monitoring: {ledger_path}")
    print("Press Ctrl+C to stop.")

    last_mtime = os.path.getmtime(ledger_path) if os.path.exists(ledger_path) else 0

    try:
        while True:
            current_mtime = os.path.getmtime(ledger_path) if os.path.exists(ledger_path) else 0
            if current_mtime > last_mtime:
                print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] Neural Pulse Detected. Syncing to AppFlowy...")
                engine.update_appflowy()
                last_mtime = current_mtime
            time.sleep(1) # High-velocity polling (1s)
    except KeyboardInterrupt:
        print("\nSentinel Standby.")

if __name__ == "__main__":
    run_realtime_sync()
