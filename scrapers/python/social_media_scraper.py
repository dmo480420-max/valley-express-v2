import asyncio
import os
import json
from datetime import datetime
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode

# Social Media: Facebook, Nextdoor, local groups (Requires specific URL handling)
SOCIAL_TARGETS = [
    {"name": "FB_Marketplace_Phoenix", "url": "https://www.facebook.com/marketplace/phoenix/search?query=delivery%20driver"},
    {"name": "Nextdoor_Local", "url": "https://nextdoor.com/find-work/"}
]

async def scrape_social_leads():
    """
    Scraper 5: Social Media Scraper
    Monitors local Phoenix groups for delivery and logistics requests.
    Note: Social platforms often require session headers or cookies.
    """
    print(f"📱 Starting Social Media Scraper - {datetime.now()}")
    
    async with AsyncWebCrawler() as crawler:
        for social in SOCIAL_TARGETS:
            print(f"🔗 Scanning {social['name']}...")
            result = await crawler.arun(
                url=social['url'],
                config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
            )
            
            filename = f"social_{social['name'].lower()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            filepath = os.path.join("..", "data", filename)
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump({
                    "source": social['url'],
                    "name": social['name'],
                    "type": "Social Media Lead",
                    "timestamp": str(datetime.now()),
                    "raw_markdown": result.markdown[:2000] 
                }, f, indent=4)
                
            print(f"✅ Data staged for {social['name']}: {filepath}")

if __name__ == "__main__":
    asyncio.run(scrape_social_leads())
