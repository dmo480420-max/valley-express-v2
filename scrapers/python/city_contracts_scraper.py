import asyncio
import os
import json
from datetime import datetime
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode

# 11 AZ Cities to target for local logistics contracts
AZ_CITIES = [
    {"name": "Phoenix", "url": "https://solicitations.phoenix.gov/"},
    {"name": "Scottsdale", "url": "https://www.scottsdaleaz.gov/purchasing/bids-and-proposals"},
    {"name": "Mesa", "url": "https://www.mesaaz.gov/business/purchasing/bidding-opportunities"},
    {"name": "Tempe", "url": "https://www.tempe.gov/government/internal-audit/procurement/bidding-opportunities"},
    {"name": "Chandler", "url": "https://www.chandleraz.gov/business/bid-opportunities"},
    {"name": "Gilbert", "url": "https://www.gilbertaz.gov/business/procurement/bidding-opportunities"},
    {"name": "Glendale", "url": "https://www.glendaleaz.com/business/procurement/current_bids"},
    {"name": "Peoria", "url": "https://www.peoriaaz.gov/government/departments/finance/purchasing/bid-opportunities"},
    {"name": "Surprise", "url": "https://www.surpriseaz.gov/business/purchasing/bid-opportunities"},
    {"name": "Avondale", "url": "https://www.avondaleaz.gov/business/procurement/bidding-opportunities"},
    {"name": "Goodyear", "url": "https://www.goodyearaz.gov/business/procurement/bidding-opportunities"}
]

async def scrape_city_contracts():
    """
    Scraper 1: City Contracts (AZ 11)
    Uses Crawl4AI to target municipal procurement portals.
    """
    print(f"🏙️ Starting AZ City Contract Scraper - {datetime.now()}")
    
    async with AsyncWebCrawler() as crawler:
        for city in AZ_CITIES:
            print(f"🔍 Checking {city['name']}...")
            result = await crawler.arun(
                url=city['url'],
                config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
            )
            
            # Logic to extract 'Reply Link' and 'Phone' using LLM-friendly MarkDown
            # (In production, this result.markdown is sent to a LLM for extraction)
            filename = f"city_{city['name'].lower()}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            filepath = os.path.join("..", "data", filename)
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump({
                    "source": city['url'],
                    "city": city['name'],
                    "type": "City Contract",
                    "timestamp": str(datetime.now()),
                    "raw_markdown": result.markdown[:1000] # Staging for Aletheia extraction
                }, f, indent=4)
                
            print(f"✅ Data staged for {city['name']}: {filepath}")

if __name__ == "__main__":
    asyncio.run(scrape_city_contracts())
