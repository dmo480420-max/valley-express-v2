/**
 * VALLEY EXPRESS MASTER LEDGER INGESTION
 * Bridge between raw scraper data and Google Fusion Backend.
 */
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const DATA_DIR = path.join(__dirname, 'data');
const PROCESSED_DIR = path.join(__dirname, 'data', 'processed');
const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

async function ingestLeads() {
    console.log('📥 Starting Master Ledger Ingestion...');
    
    if (!SCRIPT_URL) {
        console.error('❌ Error: NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not defined in .env.local');
        return;
    }

    await fs.ensureDir(PROCESSED_DIR);
    const files = await fs.readdir(DATA_DIR);
    const leadFiles = files.filter(f => f.endsWith('.json') && f !== 'processed');

    if (leadFiles.length === 0) {
        console.log('📭 No new leads found in staging.');
        return;
    }

    for (const file of leadFiles) {
        const filePath = path.join(DATA_DIR, file);
        const data = await fs.readJson(filePath);
        
        console.log(`📄 Processing ${file}...`);

        // Transform and submit (Logic depends on scraper output format)
        // Here we assume a simple array of lead objects
        const leads = data.leads || data.bids || [data.data];
        
        for (const lead of leads) {
            try {
                // Submit to Google Master Workbook via Apps Script
                await axios.post(SCRIPT_URL, {
                    action: 'ingestLead',
                    source: data.source,
                    timestamp: data.timestamp,
                    ...lead
                });
                console.log(`   ✅ Ingested: ${lead.name || lead.title || 'Unknown Lead'}`);
            } catch (err) {
                console.error(`   ❌ Failed to ingest lead:`, err.message);
            }
        }

        // Archive processed file
        await fs.move(filePath, path.join(PROCESSED_DIR, file), { overwrite: true });
        console.log(`💾 Archived ${file} to processed/`);
    }

    console.log('✅ Ingestion cycle complete.');
}

// Run every 5 minutes if needed, or once
ingestLeads();
