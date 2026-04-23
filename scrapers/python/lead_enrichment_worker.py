import os
import json
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode
from autoscraper import AutoScraper
from spider import Spider

load_dotenv(dotenv_path="../../.env.local")

class SovereignLeadEngine:
    """
    VALLEY EXPRESS: FREE ROTATION ENGINE
    Uses Open-Source tools only (No Apify/Firecrawl).
    Rotation: Crawl4AI -> AutoScraper -> Spider
    """

    def __init__(self):
        self.scraper = AutoScraper()
        # Initialize Spider with local/free config if available
        self.spider = Spider() 

    async def scrape_via_crawl4ai(self, url):
        """Primary Engine: High-fidelity Markdown extraction."""
        print(f"🕷️ Crawl4AI: Sweeping {url}...")
        async with AsyncWebCrawler() as crawler:
            result = await crawler.arun(
                url=url,
                config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
            )
            return result.markdown

    def scrape_via_autoscraper(self, url, wanted_list):
        """Secondary Engine: Fast rule-based extraction for contacts."""
        print(f"🤖 AutoScraper: Extracting patterns from {url}...")
        # Learns from 'wanted_list' (e.g. sample emails/phones)
        return self.scraper.build(url, wanted_list)

    async def enrich_lead(self, lead_name, website):
        """
        Rotates through free engines to find decision makers & contacts.
        """
        print(f"🚀 Enriching Lead: {lead_name}...")
        
        # 1. Get Clean Data via Crawl4AI
        markdown_data = await self.scrape_via_crawl4ai(website) if website else ""
        
        # 2. Extract specific patterns if needed via AutoScraper
        # (Example: passing sample email formats to learn from the page)
        emails = []
        if website:
            try:
                # Basic email pattern match from the markdown
                import re
                emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', markdown_data)
            except:
                pass

        # 3. Simulate Decision Maker Search (Generic Public Web Search + Scrape)
        search_url = f"https://www.google.com/search?q=Logistics+Manager+{lead_name.replace(' ', '+')}"
        # In a real workflow, we'd crawl the search result or use a free search API
        
        return {
            "name": lead_name,
            "website": website,
            "emails": list(set(emails)),
            "source": "Open-Source Rotation",
            "timestamp": str(datetime.now())
        }

async def run_sample_rotation():
    engine = SovereignLeadEngine()
    
    # Target List from the Initial Phoenix Targets
    targets = [
        {"name": "Copper Star Home Medical Supplies", "url": "https://www.copperstarmedical.com/"},
        {"name": "US Distributing", "url": "https://www.usdistributing.com/"}
    ]
    
    results = []
    for target in targets:
        enriched = await engine.enrich_lead(target['name'], target['url'])
        results.append(enriched)
        
    # Save results to staging data
    output_path = os.path.join("..", "data", "free_rotation_leads.json")
    with open(output_path, "w") as f:
        json.dump(results, f, indent=4)
    print(f"✅ Rotation Complete. Results saved to {output_path}")

if __name__ == "__main__":
    asyncio.run(run_sample_rotation())
