import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'jobs_ledger.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jobs = JSON.parse(fileContent);
    
    // Sort by created_at descending (latest first)
    const sortedJobs = jobs.sort((a: any, b: any) => {
      const dateA = new Date(a.created_at || a.timestamp || 0).getTime();
      const dateB = new Date(b.created_at || b.timestamp || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(sortedJobs);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, updates } = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'jobs_ledger.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let jobs = JSON.parse(fileContent);
    
    const jobIndex = jobs.findIndex((j: any) => j.id === id);
    if (jobIndex === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    
    // Perform updates
    jobs[jobIndex] = { ...jobs[jobIndex], ...updates };
    
    // If updates include a new call log, append it instead of replacing
    if (updates.new_call_log) {
      if (!jobs[jobIndex].call_logs) jobs[jobIndex].call_logs = [];
      jobs[jobIndex].call_logs.push({
        timestamp: new Date().toISOString(),
        note: updates.new_call_log
      });
      delete jobs[jobIndex].new_call_log;
    }

    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
    
    return NextResponse.json(jobs[jobIndex]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}


