import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const data = await request.json();
  const LEDGER_PATH = path.join(process.cwd(), 'data', 'jobs_ledger.json');

  try {
    // 1. Read existing ledger
    let ledger = [];
    if (fs.existsSync(LEDGER_PATH)) {
      const content = fs.readFileSync(LEDGER_PATH, 'utf-8');
      ledger = JSON.parse(content);
    }

    // Helper to extract Phoenix zones from address
    const extractZone = (addr: string) => {
      const pz = ["Scottsdale", "Mesa", "Tempe", "Glendale", "Surprise", "Peoria", "Avondale", "Chandler", "Gilbert"];
      const match = pz.find(z => addr.toLowerCase().includes(z.toLowerCase()));
      return match || "Downtown Phoenix";
    };

    // 2. Create New Job Entry
    const newJob = {
      id: `WEB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      company_name: data.company_name,
      contact_name: data.contact_name,
      phone: data.phone,
      pickup_address: data.pickup_address,
      dropoff_address: data.dropoff_address,
      pickup_zone: extractZone(data.pickup_address),
      dropoff_zone: extractZone(data.dropoff_address),
      pickup_time: data.pickup_time,
      industry: data.industry,
      type: data.type,
      rate: parseFloat(data.rate),
      miles: parseFloat(data.miles || 1),
      rpm: parseFloat(data.rate) / parseFloat(data.miles || 1),
      priority: data.priority || 'NORMAL',
      status: 'available',
      created_at: new Date().toISOString(),
      notes: data.notes
    };

    // 3. Save to Ledger
    ledger.push(newJob);
    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));

    // 4. Also attempt n8n webhook if configured
    const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/valley-express-booking';
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
    } catch (whError) {
      console.log("n8n Hook suppressed - running local ledger only.");
    }

    return NextResponse.json({ success: true, jobId: newJob.id });
  } catch (error) {
    console.error('Booking Engine Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
