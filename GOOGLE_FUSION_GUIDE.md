# Valley Express: Google Ecosystem Fusion v3.0

This guide activates the **Navy & Teal** Command Engine using Google Sheets as the master logic ledger.

## 1. Google Sheet Setup
1. Create a new Google Sheet named **"Valley Express Master Workbook"**.
2. Designate the first sheet as `DISPATCH_GRID`.
3. Columns (A-F): `timestamp`, `identifier`, `sector`, `total_revenue`, `courier_payout`, `platform_fee`.

## 2. Apps Script Integration (Navy/Teal Logic)
Open **Extensions > Apps Script** and deploy the following code:

```javascript
/**
 * VALLEY EXPRESS — GOOGLE FUSION BRIDGE v3.0
 * Logic: Corporate Minimalist 75/25 Split Ingestion
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('DISPATCH_GRID');
    
    // CALCULATION ENGINE (75/25 Split)
    const totalRevenue = parseFloat(data.amount) || 0;
    const driverShare = totalRevenue * 0.75;
    const platformFee = totalRevenue * 0.25;
    
    sheet.appendRow([
      new Date(),
      data.id || 'AUTO_GEN',
      data.type || 'MEDICAL_STAT',
      totalRevenue,
      driverShare,
      platformFee
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'SUCCESS',
      protocol: 'NAVY_TEAL_SYNC',
      driver_yield: driverShare
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'ERROR',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deployment
1. Click **Deploy > New Deployment**.
2. Select **Web App**.
3. Set **Execute as:** `Me`.
4. Set **Who has access:** `Anyone`.
5. Copy the **Web App URL**.

## 4. Platform Linkage
1. Open `.env.local`.
2. Set `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` to your Web App URL.
3. Restart the dev server.

---
**Status:** Corporate Minimalist Ledger Activated.
