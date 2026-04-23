import scrapy
from datetime import datetime
import os

class LogisticsSpider(scrapy.Spider):
    name = "logistics_spider"
    
    # Example: Directory of Logistics Companies in Phoenix
    start_urls = [
        "https://www.yellowpages.com/phoenix-az/logistics"
    ]

    def parse(self, response):
        for company in response.css('div.v-card'):
            yield {
                'name': company.css('a.business-name span::text').get(),
                'phone': company.css('div.phones::text').get(),
                'address': company.css('div.adr span::text').get(),
                'timestamp': str(datetime.now())
            }

        # Follow pagination
        next_page = response.css('a.next::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)

# To run: scrapy runspider scrapy_worker.py -o ../data/scrapy_raw_leads.json
