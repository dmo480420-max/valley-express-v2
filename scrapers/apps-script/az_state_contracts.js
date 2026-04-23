/**
 * VALLEY EXPRESS: AZ STATE CONTRACT INGESTION (RSS)
 * This function fetches contract opportunities from the State of Arizona.
 * It uses a "Keyless API" approach via the public RSS feed.
 */
function fetchStateContracts() {
  // We don't need an API key, we just need the public RSS URL!
  const azRssUrl = "https://app.az.gov/rss/bids"; 
  
  // Call the URL (100% Free)
  const response = UrlFetchApp.fetch(azRssUrl);
  
  // Parse the XML data instead of JSON
  const xml = response.getContentText();
  const document = XmlService.parse(xml);
  const entries = document.getRootElement().getChildren('channel')[0].getChildren('item');
  
  // Identify the target sheet
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName("Gov Bids");
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet("Gov Bids");
    sheet.appendRow(["Timestamp", "Title", "Link", "Status"]);
    sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#FFC627");
  }

  // Now we just loop through them and drop them into your Gov Bids tab!
  for (let i = 0; i < entries.length; i++) {
    let title = entries[i].getChildText('title');
    let link = entries[i].getChildText('link');
    
    // Filter and pushes to Google Sheets (Example: deduplication check)
    // For now, we append new entries
    sheet.appendRow([new Date(), title, link, "New"]);
  }
}
