import os
from apify_client import ApifyClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ApifyWorker:
    """
    VALLEY EXPRESS LOGISTICS: APIFY WORKER
    Handles high-tier scraping for Facebook, TaskRabbit, and Thumbtack.
    """
    
    @staticmethod
    def scrape_facebook_groups(group_urls):
        """
        Runs the Facebook Groups Scraper actor.
        """
        token = os.getenv("APIFY_TOKEN")
        if not token:
            print("[ERROR] APIFY_TOKEN MISSING in .env")
            return []
            
        client = ApifyClient(token)
        run_input = {
            "startUrls": [{"url": url} for url in group_urls],
            "maxPosts": 5,
            "viewGroupAs": "GUEST"
        }
        
        # Using a common FB Groups Scraper actor (apify/facebook-groups-scraper)
        print(f"[APIFY] Launching FB Scraper for {len(group_urls)} groups...")
        run = client.actor("apify/facebook-groups-scraper").call(run_input=run_input)
        
        leads = []
        for item in client.dataset(run["defaultDatasetId"]).iterate_items():
            leads.append({
                "title": item.get("text", "")[:100],
                "content": item.get("text", ""),
                "url": item.get("url", ""),
                "source": "Facebook Group"
            })
        return leads

    @staticmethod
    def scrape_taskrabbit_phx():
        """
        Runs a custom search for TaskRabbit deliveries in Phoenix.
        """
        # Placeholder for TaskRabbit actor or generic web scraper actor
        print("[APIFY] Launching TaskRabbit Pulse...")
        # (Implementation details would depend on specific actor availability)
        return []

    @staticmethod
    def scrape_thumbtack_phx():
        """
        Runs a custom search for Thumbtack logistics in Phoenix.
        """
        print("[APIFY] Launching Thumbtack Pulse...")
        return []
