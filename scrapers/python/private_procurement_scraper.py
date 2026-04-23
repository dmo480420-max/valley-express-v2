import asyncio
import os
import json
from datetime import datetime
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode

# Private Platforms: BidNet, Bonfire, PlanetBids
PRIVATE_PLATFORMS = [
    {"name": "BidNet", "url": "https://www.bidnetdirect.com/arizona"},
    {"name": "PlanetBids", "url": "https://www.planetbids.com/portal/portal.cfm?CompanyID=23343"} # Example PB ID
]

async def scrape_private_procurement():
    """
    Scraper 3: Private Procurement
    Targets BidNet, Bonfire, and PlanetBids for logistics RFP/Bids.
    """
    print(f"💼 Starting Private Procurement Scraper - {datetime.now()}")
    
    async with AsyncWebCrawler() as crawler:
        for platform in PRIVATE_PLATFORMS:
            print(f"🔒 Accessing {platform['name']}...")
            result = await crawler.arun(
                url=platform['url'],
                config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
            )
            
            filename = f"private_{platform['name'].lower()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            filepath = os.path.join("..", "data", filename)
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump({
                    "source": platform['url'],
                    "platform": platform['name'],
                    "type": "Private Procurement",
                    "timestamp": str(datetime.now()),
                    "raw_markdown": result.markdown[:2000] 
                }, f, indent=4)
                
            print(f"✅ Data staged for {platform['name']}: {filepath}")

if __name__ == "__main__":
    asyncio.run(scrape_private_procurement())
