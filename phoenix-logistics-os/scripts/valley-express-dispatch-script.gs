/**
 * Valley Express Transport - AI Dispatch Master
 * Version: 2.0 (Google Database Mode)
 * System Flow: n8n Scraper -> Google Sheet -> GAS AI Logic -> Email/SMS Alert
 */

function checkJobs() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Jobs");
  if (!sheet) {
    Logger.log("Sheet 'Jobs' not found. Please create it.");
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const alertEmail = "jasminejobs1987@gmail.com, dmo480420@gmail.com"; 
  
  // HEADERS: [0]Description, [1]Pay, [2]Location, [3]AI Score, [4]Status
  
  for (var i = 1; i < data.length; i++) {
    var jobDescription = data[i][0];
    var pay = data[i][1];
    var location = data[i][2];
    var aiScore = data[i][3] || 0; // Default to 0 if empty
    var status = data[i][4];

    // Priority 1: High AI Score (> 85)
    // Priority 2: Medical Keywords
    if (status !== "ALERTED") {
      var isMedical = jobDescription.toLowerCase().includes("medical") || jobDescription.toLowerCase().includes("specimen");
      
      if (aiScore >= 85 || isMedical) {
        var priorityTag = isMedical ? "🚨 STAT MEDICAL" : "💎 HIGH PROFIT";
        
        // SEND EMAIL ALERT
        GmailApp.sendEmail(
          alertEmail,
          priorityTag + " | " + jobDescription.substring(0, 25) + "...",
          "VALLEY EXPRESS - PRECISION DISPATCH ALERT\n\n" +
          "PRIORITY: " + priorityTag + "\n" +
          "AI SCORE: " + aiScore + "/100\n" +
          "DESCRIPTION: " + jobDescription + "\n" +
          "LOCATION: " + location + "\n" +
          "PAY: $" + pay + "\n\n" +
          "ACTION: Log into Driver Dashboard to claim."
        );
        
        // MARK AS PROCESSED
        sheet.getRange(i + 1, 5).setValue("ALERTED");
      } else if (aiScore > 0 && aiScore < 60) {
        // Mark low priority jobs as IGNORED automatically
        sheet.getRange(i + 1, 5).setValue("LOW_PRIORITY");
      }
    }
  }
}

/**
 * INSTALLATION & TRIGGERS:
 * 1. Open Google Sheet "Valley Express Dispatch".
 * 2. Setup columns: A: Job Description, B: Pay, C: Location, D: AI Score, E: Status.
 * 3. Extensions > Apps Script > Paste this code.
 * 4. Triggers (Clock icon): 
 *    - Add Trigger -> function: checkJobs
 *    - Event source: Time-driven
 *    - Type: Minutes timer
 *    - Interval: Every 1 minute
 */
