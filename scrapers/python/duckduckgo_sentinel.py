import requests
from bs4 import BeautifulSoup
import time
import random

class DuckDuckGoSentinel:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }

    def hunt_broad(self, query):
        print(f"   [FREE SENTINEL] DuckDuckGo Hunting: '{query}'...")
        url = f"https://html.duckduckgo.com/html/?q={query}+Phoenix+Arizona"
        
        try:
            response = requests.get(url, headers=self.headers, timeout=15)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                results = soup.find_all('div', class_='result')
                
                leads = []
                for res in results[:8]: # Top 8 results
                    title_tag = res.find('a', class_='result__a')
                    snippet_tag = res.find('a', class_='result__snippet')
                    
                    if title_tag:
                        leads.append({
                            "company": title_tag.text.strip(),
                            "url": title_tag['href'],
                            "description": snippet_tag.text.strip() if snippet_tag else "N/A",
                            "source": "DuckDuckGo Sentinel",
                            "industry": query
                        })
                return leads
            return []
        except Exception as e:
            print(f"   [ERROR] DuckDuckGo Failed: {e}")
            return []

if __name__ == "__main__":
    sentinel = DuckDuckGoSentinel()
    print(sentinel.hunt_broad("Medical Courier"))
