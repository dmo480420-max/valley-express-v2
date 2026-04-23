// =========================================================================
// VALLEY EXPRESS: SAM.GOV API INTEGRATION
// Automatically fetches lucrative government transport contracts in AZ
// =========================================================================
function fetchSamGovContracts() {
  // 1. YOUR CREDENTIALS & SETTINGS
  const API_KEY = "PASTE_YOUR_API_KEY_HERE"; // <-- Paste your 40-character GSA key here
  const adminEmail = "YOUR_EMAIL@gmail.com"; // <-- Where you want the alerts sent
  const stateCode = "AZ"; // Filtering for Arizona
  
  // 2. DYNAMIC DATE RANGE (Get contracts posted in the last 48 hours)
  const today = new Date();
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);
  
  const postedTo = Utilities.formatDate(today, Session.getScriptTimeZone(), "MM/dd/yyyy");
  const postedFrom = Utilities.formatDate(twoDaysAgo, Session.getScriptTimeZone(), "MM/dd/yyyy");
  
  // 3. THE OFFICIAL US GOV API URL
  // We are searching for opportunities in AZ posted in the last 2 days.
  // NAICS Code 492110 is "Couriers and Express Delivery Services"
  const apiUrl = `https://api.sam.gov/prod/opportunities/v2/search?api_key=${API_KEY}&postedFrom=${postedFrom}&postedTo=${postedTo}&state=${stateCode}&limit=20`;
  
  try {
    // 4. CALL THE API
    const response = UrlFetchApp.fetch(apiUrl, { muteHttpExceptions: true });
    const json = JSON.parse(response.getContentText());
    
    // Check if the API threw an error (like an invalid key)
    if (json.error) {
      Logger.log("API Error: " + json.error.message);
      return;
    }
    
    // 5. PARSE THE DATA & PUSH TO GOOGLE SHEETS
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName("Gov Bids");
    
    // Unified Header Check
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Gov Bids");
      sheet.appendRow(["Timestamp", "Title", "Agency/Source", "Deadline", "Link", "Status"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#FFC627").setFontColor("#8C1D40");
    }

    const opportunities = json.opportunitiesData || [];
    
    let newContractsFound = 0;
    let emailHtml = "<h2>🏛️ New Government Contracts Found</h2><ul>";
    
    for (let i = 0; i < opportunities.length; i++) {
      const opp = opportunities[i];
      const title = opp.title || "Unknown Title";
      const agency = opp.department || opp.agency || "Unknown Agency";
      const deadline = opp.responseDeadLine || "Not Specified";
      const uiLink = opp.uiLink || "https://sam.gov"; // The link to apply
      
      // Keyword Filter: Only grab it if it relates to transport, logistics, or medical
      const titleLower = title.toLowerCase();
      if (titleLower.includes("transport") || titleLower.includes("courier") || 
          titleLower.includes("freight") || titleLower.includes("delivery") || 
          titleLower.includes("logistics") || titleLower.includes("medical")) {
        
        // Append to our Sovereign Database (Matches Unified Header)
        sheet.appendRow([
          new Date(), 
          title, 
          agency, 
          deadline, 
          uiLink, 
          "🚨 Needs Review"
        ]);
        
        // Add to our Email Alert summary
        emailHtml += `<li><strong>${title}</strong><br/>Agency: ${agency}<br/>Deadline: ${deadline}<br/><a href="${uiLink}">View on SAM.gov</a></li><br/>`;
        newContractsFound++;
      }
    }
    
    // 6. SEND THE EXECUTIVE ALERT
    if (newContractsFound > 0) {
      emailHtml += "</ul>";
      MailApp.sendEmail({
        to: adminEmail,
        subject: `🚨 Valley Express: ${newContractsFound} New Gov Contracts Found`,
        htmlBody: emailHtml
      });
      Logger.log("✅ Ingested and alerted for " + newContractsFound + " SAM.gov opportunities.");
    }
    
  } catch (err) {
    Logger.log("Script crashed: " + err.toString());
  }
}
