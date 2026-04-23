import os
import json
from datetime import datetime
from scrapegraphai.graphs import SmartScraperGraph

# Load API Key from environment
from dotenv import load_dotenv
load_dotenv()

def scrape_with_intent(prompt, source):
    """
    Uses ScrapeGraphAI to extract specific logistics data via natural language.
    """
    print(f"🧠 Starting ScrapeGraphAI Worker - {datetime.now()}")
    
    graph_config = {
        "llm": {
            "model": "openai/gpt-4o",
            "api_key": os.getenv("OPENAI_API_KEY"),
        },
    }

    smart_scraper = SmartScraperGraph(
        prompt=prompt,
        source=source,
        config=graph_config
    )

    result = smart_scraper.run()
    
    # Save to staging area
    filename = f"intent_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    filepath = os.path.join("..", "data", filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump({
            "source": source,
            "prompt": prompt,
            "timestamp": str(datetime.now()),
            "data": result
        }, f, indent=4)
        
    print(f"✅ Intent-based extraction complete: {filepath}")

if __name__ == "__main__":
    # Example Intent: Deep extract medical courier opportunities
    scrape_with_intent(
        prompt="Extract all company names, contact emails, and medical delivery requirements from this page.",
        source="https://example-logistics-portal.com/bids"
    )
