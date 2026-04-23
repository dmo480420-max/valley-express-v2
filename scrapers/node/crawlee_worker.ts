import { PlaywrightCrawler } from 'crawlee';
import * as fs from 'fs-extra';
import * as path from 'path';
import { format } from 'date-fns';

/**
 * VALLEY EXPRESS: CRAWLEE ENGINE
 * Sophisticated, anti-blocking logistics crawler.
 */
async function runCrawlee() {
    const crawler = new PlaywrightCrawler({
        async requestHandler({ page, request, log }) {
            const title = await page.title();
            log.info(`Processing ${request.url}: ${title}`);

            // Extract potential logistics targets (Example)
            const companies = await page.$$eval('.company-listing', (elements) => 
                elements.map(el => ({
                    name: el.querySelector('.company-name')?.textContent?.trim(),
                    phone: el.querySelector('.company-phone')?.textContent?.trim(),
                    website: el.querySelector('.company-link')?.getAttribute('href'),
                }))
            );

            // Save to data folder
            const timestamp = format(new Date(), 'yyyyMMdd_HHmmss');
            const filename = `crawlee_${timestamp}.json`;
            const filepath = path.join(__dirname, '..', 'data', filename);

            await fs.outputJson(filepath, {
                source: request.url,
                timestamp: new Date().toISOString(),
                leads: companies.filter(c => c.name)
            }, { spaces: 4 });

            log.info(`✅ Data saved to ${filepath}`);
        },
        maxRequestsPerCrawl: 50,
    });

    await crawler.run(['https://www.thomasnet.com/northern-california/logistics-services-47671103-1.html']);
}

runCrawlee().catch(err => {
    console.error('CRAWLEE_ERROR:', err);
    process.exit(1);
});
