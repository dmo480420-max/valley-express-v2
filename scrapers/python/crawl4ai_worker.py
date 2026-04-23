import asyncio
import os
import json
from datetime import datetime
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, CacheMode

async def crawl_logistics_leads(urls):
    """
    Crawls logistics sites and extracts clean Markdown for Aletheia verification.
    """
    print(f"🚀 Starting Crawl4AI Worker - {datetime.now()}")
    
    async with AsyncWebCrawler() as crawler:
        for url in urls:
            print(f"🔍 Analyzing: {url}")
            result = await crawler.arun(
                url=url,
                config=CrawlerRunConfig(cache_mode=CacheMode.BYPASS)
            )
            
            # Save to staging area
            filename = f"crawl_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
            filepath = os.path.join("..", "data", filename)
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(f"Source: {url}\n")
                f.write(f"Timestamp: {datetime.now()}\n")
                f.write("-" * 40 + "\n")
                f.write(result.markdown)
                
            print(f"✅ Extracted to {filepath}")

if __name__ == "__main__":
    # Example Target: Phoenix Logistics Directories
    targets = ["https://www.aztrucking.com/"]
    asyncio.run(crawl_logistics_leads(targets))
