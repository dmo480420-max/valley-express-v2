/**
 * VALLEY EXPRESS LUXURY LOGISTICS — GOOGLE ECOSYSTEM FUSION v3.0
 * lib/google-api.ts - Crash-Proof Bulk API Bridge
 */

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';
const BATCH_SIZE = 50;

/**
 * Sanitizes an object or array to ensure no null/undefined values hit the GAS payload.
 */
const sanitize = (data: any): any => {
  if (Array.isArray(data)) return data.map(sanitize);
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, v === null || v === undefined ? "" : sanitize(v)])
    );
  }
  return data;
};

/**
 * Delay with Jitter for Exponential Backoff
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms + Math.random() * 100));

export const googleApi = {
  /**
   * BULK PUSH: The "Crash-Proof" pipeline for Jobs, Marketing, or Contracts.
   */
  async pushToSheet(sheetName: 'Jobs' | 'Marketing Targets' | 'Contracts', data: any[]) {
    if (!SCRIPT_URL) return { success: false, message: 'FUSION_URL_MISSING' };

    const cleanData = sanitize(data);
    const results = [];

    for (let i = 0; i < cleanData.length; i += BATCH_SIZE) {
      const chunk = cleanData.slice(i, i + BATCH_SIZE);
      let retries = 0;
      let success = false;

      while (retries < 3 && !success) {
        try {
          await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ sheetName, data: chunk, action: 'bulkPush' }),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
          });
          success = true; 
          results.push(`Batch ${i/BATCH_SIZE + 1} Success`);
        } catch (error) {
          retries++;
          const wait = Math.pow(2, retries) * 1000;
          await delay(wait);
        }
      }
    }
    return { success: true, batches: results.length };
  },

  /**
   * CREATE DOCUMENT: Generates an official Google Doc via Apps Script.
   */
  async createDoc(title: string, content: string) {
    if (!SCRIPT_URL) return { success: false, message: 'FUSION_URL_MISSING' };
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'createDocument', title, content }),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      });
      return await response.json();
    } catch (error) {
      console.error('DOC_CREATION_FAILED:', error);
      return { success: false, error };
    }
  },

  /**
   * LEGACY WRAPPER: Matches existing submitToMasterWorkbook signature
   */
  async submitToMasterWorkbook(data: any) {
    return this.pushToSheet('Jobs', [data]);
  }
};
