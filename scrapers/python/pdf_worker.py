import os
import requests
import json
from typing import List

class PDFWorker:
    """
    VALLEY EXPRESS | DOCUMENT AUTOMATOR
    Integrates Stirling-PDF API for high-end logistics document processing.
    """
    
    def __init__(self, api_url="http://localhost:8080", api_key=None):
        self.api_url = api_url.rstrip("/")
        self.api_key = api_key
        self.headers = {"Authorization": f"Bearer {api_key}"} if api_key else {}

    def merge_logistics_docs(self, file_paths: List[str], output_name="merged_manifest.pdf"):
        """
        Merges multiple carrier documents into a single master manifest.
        Ref: Stirling-PDF /api/v1/general/merge-pdfs
        """
        print(f"VALLEY EXPRESS: Merging {len(file_paths)} documents...")
        endpoint = f"{self.api_url}/api/v1/general/merge-pdfs"
        
        try:
            files = []
            for path in file_paths:
                if os.path.exists(path):
                    files.append(('fileInput', (os.path.basename(path), open(path, 'rb'), 'application/pdf')))
            
            data = {"sortType": "orderProvided"}
            
            response = requests.post(endpoint, files=files, data=data, headers=self.headers)
            
            if response.status_code == 200:
                output_path = os.path.join("documents", "processed", output_name)
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                with open(output_path, "wb") as f:
                    f.write(response.content)
                print(f"SUCCESS: Master manifest saved to {output_path}")
                return output_path
            else:
                print(f"STIRLING ERROR: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            print(f"AUTOMATOR CRASH: {e}")
            return self.fallback_merge(file_paths, output_name)

    def fallback_merge(self, file_paths, output_name):
        """
        Internal fallback if Stirling-PDF is offline.
        Uses basic logic or alerts the dispatcher.
        """
        print("ALERT: Stirling-PDF offline. Falling back to local verification...")
        # In a real environment, we'd use pypdf or similar here.
        return None

if __name__ == "__main__":
    # Test initialization
    worker = PDFWorker()
    print("PDF Worker Initialized. Awaiting document pings...")
