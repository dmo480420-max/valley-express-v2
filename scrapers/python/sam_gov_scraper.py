import asyncio
import os
import json
from datetime import datetime, timedelta
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode

async def scrape_sam_gov():
    """
    Scraper 2: SAM.gov (Federal Contracts)
    Targets federal opportunities in the Arizona sector.
    """
    print(f"🏛️ Starting SAM.gov Python Scraper - {datetime.now()}")
    
    # Filtering for transport/logistics in AZ
    # This URL is a starting point; in a production run, we'd use the API or deep crawl results
    base_url = "https://sam.gov/search/?index=opp&page=1&sort=-modifiedDate&mode=search&is_active=true&notice_type=r,p,k&state=AZ"
    
    async with AsyncWebCrawler() as crawler:
        print(f"📡 Sweeping Federal Bids...")
        result = await crawler.arun(
            url=base_url,
            config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
        )
        
        filename = f"samgov_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        filepath = os.path.join("..", "data", filename)
        
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump({
                "source": base_url,
                "type": "Federal Contract",
                "timestamp": str(datetime.now()),
                "raw_markdown": result.markdown[:3000] # Federal bids often have long descriptions
            }, f, indent=4)
            
        print(f"✅ Federal sweep complete: {filepath}")

if __name__ == "__main__":
    asyncio.run(scrape_sam_gov())
