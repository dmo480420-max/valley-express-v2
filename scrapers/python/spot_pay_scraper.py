import asyncio
import os
import json
from datetime import datetime
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode

# Spot Pay / Daily Pay Gigs
GIG_PLATFORMS = [
    {"name": "Roadie", "url": "https://www.roadie.com/drivers"},
    {"name": "GoShare", "url": "https://goshare.co/drivers/"},
    {"name": "Wonolo", "url": "https://www.wonolo.com/find-work/"}
]

async def scrape_spot_pay_gigs():
    """
    Scraper 4: Spot Pay / Daily Pay Gigs
    Monitors gig boards for immediate delivery opportunities.
    """
    print(f"📦 Starting Spot Pay Scraper - {datetime.now()}")
    
    async with AsyncWebCrawler() as crawler:
        for platform in GIG_PLATFORMS:
            print(f"🚚 Checking {platform['name']}...")
            result = await crawler.arun(
                url=platform['url'],
                config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
            )
            
            filename = f"gig_{platform['name'].lower()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            filepath = os.path.join("..", "data", filename)
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump({
                    "source": platform['url'],
                    "platform": platform['name'],
                    "type": "Spot Pay Gig",
                    "timestamp": str(datetime.now()),
                    "raw_markdown": result.markdown[:1500] 
                }, f, indent=4)
                
            print(f"✅ Data staged for {platform['name']}: {filepath}")

if __name__ == "__main__":
    asyncio.run(scrape_spot_pay_gigs())
