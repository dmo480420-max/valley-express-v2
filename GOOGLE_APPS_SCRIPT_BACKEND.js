/**
 * VALLEY EXPRESS NEURAL DISPATCH
 * Google Apps Script Backend (v1.0)
 * 
 * Instructions:
 * 1. Open your Master Ledger Spreadsheet.
 * 2. Extensions -> Apps Script.
 * 3. Paste this code.
 * 4. Replace SHEET_ID with your spreadsheet ID.
 * 5. Deploy -> New Deployment -> Web App (Execute as: Me, Who has access: Anyone).
 */

const SHEET_ID = "1kDdR2jBoUeDxeLI6OxXXQckU5U7x6LG_hmZCex31IKY";
const REQUIRED_SHEETS = ["Jobs", "Leads", "Neural Heartbeat", "Marketing Targets", "Aletheia Audit"];

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔱 Neural Sync')
      .addItem('Run Force Sync (Firebase -> Sheet)', 'syncFromFirebase')
      .addItem('Push to Firebase (Sheet -> Firebase)', 'pushMigrationToFirebase')
      .addItem('Initialize Ledger Tabs', 'initializeLedger')
      .addToUi();
}

/**
 * 📡 API GATEWAY: Handles external JSON requests
 */
function doGet(e) {
  const action = e.parameter.action;
  const sheetName = e.parameter.sheetName || "Jobs";
  
  if (action === "getSheetData") {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return ContentService.createTextOutput(JSON.stringify({error: "Sheet not found"})).setMimeType(ContentService.MimeType.JSON);
    
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    const result = data.map(row => {
      let obj = {};
      headers.forEach((header, i) => obj[header] = row[i]);
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  const action = params.action;
  
  if (action === "bulkPush") {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(params.sheetName || "Jobs");
    if (!sheet) return ContentService.createTextOutput("Sheet not found");
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    params.data.forEach(item => {
      // Auto-Timestamp if missing
      if (!item["Timestamp"] && !item["Date Added"]) item["Timestamp"] = new Date();
      
      const row = headers.map(h => item[h] || "");
      sheet.appendRow(row);
    });
    
    // 🔥 AUTO-CLEANUP: Deletes "Ghost Rows" to keep data at the top
    cleanupSheet(sheet);
    
    return ContentService.createTextOutput("SUCCESS");
  }
  
  if (action === "updateCell") {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(params.sheetName);
    if (!sheet) return ContentService.createTextOutput("Sheet not found");
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const colIndex = headers.indexOf(params.columnName) + 1;
    
    if (colIndex > 0) {
      sheet.getRange(params.rowId, colIndex).setValue(params.value);
      return ContentService.createTextOutput("SUCCESS");
    }
    return ContentService.createTextOutput("Column not found");
  }
}

function cleanupSheet(sheet) {
  const lastRow = sheet.getLastRow();
  const maxRows = sheet.getMaxRows();
  if (maxRows > lastRow + 1) {
    sheet.deleteRows(lastRow + 1, maxRows - lastRow - 1);
  }
}

function initializeLedger() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  REQUIRED_SHEETS.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      // Initialize Modern Headers
      const headers = getHeadersForSheet(name);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers])
           .setBackground("#8C1D40").setFontColor("white").setFontWeight("bold");
    }
  });
}

function getHeadersForSheet(name) {
  switch(name) {
    case "Jobs": return ["Timestamp", "Title", "Source", "Pay", "Status", "Link", "Category", "Truth Score", "Notes"];
    case "Leads": return ["Timestamp", "Company", "Job Title", "Email", "Telephone Number", "Type", "Zone", "Contact", "Status", "AI Scrutiny"];
    case "Marketing Targets": return ["Timestamp", "Company", "Job Title", "Email", "Telephone Number", "Type", "Zone", "Contact", "Status", "AI Scrutiny"];
    case "Neural Heartbeat": return ["Pulse Time", "Sync Status", "Records Synced", "Neural Output"];
    case "Aletheia Audit": return ["Date", "Lead ID", "Tier", "Reasoning", "Scrutiny Signature"];
    default: return ["Data"];
  }
}
const PROJECT_ID = "valley-express-os";

/**
 * 🔱 NEURAL SYNC: Pulls data from Firebase Firestore directly
 */
function syncFromFirebase() {
  const collections = ["jobs", "leads"];
  
  collections.forEach(col => {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${col}`;
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const json = JSON.parse(response.getContentText());
    
    if (json.documents) {
      const data = json.documents.map(doc => {
        const fields = doc.fields || {};
        const firebaseId = doc.name.split('/').pop(); // Unique ID for deduplication
        
        if (col === "jobs") {
          return {
            "Load ID": fields.load_id ? fields.load_id.stringValue : firebaseId.substring(0, 8),
            "Pickup Zone": fields.zone ? fields.zone.stringValue : "Phoenix-SW",
            "Industry": fields.industry ? fields.industry.stringValue : "Medical",
            "Rate": fields.rate ? fields.rate.stringValue : "$0.00",
            "Priority": fields.priority ? fields.priority.stringValue : "ROUTINE",
            "Status": fields.status ? fields.status.stringValue : "Unassigned",
            "Firebase ID": firebaseId
          };
        } else if (col === "leads") {
          return {
            "ID": `MT-${Math.floor(Math.random() * 900) + 100}`,
            "Business Name": fields.company ? fields.company.stringValue : "N/A",
            "Phone": fields.phone ? fields.phone.stringValue : "N/A",
            "Address": fields.address ? fields.address.stringValue : "N/A",
            "City": fields.city ? fields.city.stringValue : "Phoenix",
            "State": "AZ",
            "Website": fields.website ? fields.website.stringValue : "N/A",
            "Type": fields.type ? fields.type.stringValue : "Medical",
            "Contact Email": fields.email ? fields.email.stringValue : "N/A",
            "Lead": fields.lead_source ? fields.lead_source.stringValue : "B2B",
            "Status": fields.status ? fields.status.stringValue : "New",
            "Priority": fields.priority ? fields.priority.stringValue : "Med",
            "Score": fields.score ? fields.score.integerValue : 75,
            "Firebase ID": firebaseId
          };
        }
      });
      
      const sheetName = col === "jobs" ? "Jobs" : "Marketing Targets";
      processBulkSync(sheetName, data);
      logHeartbeat(`Sync successful for ${col}: ${data.length} records.`);
    }
  });
}

function logHeartbeat(message) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName("Neural Heartbeat");
  if (!sheet) {
    sheet = ss.insertSheet("Neural Heartbeat");
    sheet.appendRow(["Timestamp", "Message", "Status"]);
    sheet.getRange(1, 1, 1, 3).setBackground("#8C1D40").setFontColor("#FFC627").setFontWeight("bold");
  }
  sheet.insertRowAfter(1);
  sheet.getRange(2, 1, 1, 3).setValues([[new Date(), message, "OK"]]);
}

function processBulkSync(sheetName, data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = Object.keys(data[0]);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setBackground("#8C1D40").setFontColor("#FFC627").setFontWeight("bold");
  }

  // Deduplication Check: Only add if 'Firebase ID' isn't already in the sheet
  const existingIds = sheet.getRange(2, sheet.getLastColumn(), sheet.getLastRow(), 1).getValues().flat();
  
  data.forEach(row => {
    if (!existingIds.includes(row["Firebase ID"])) {
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const newRow = headers.map(h => row[h] || "");
      sheet.appendRow(newRow);
    }
  });
}

/**
 * 🔱 UNIVERSAL BRIDGE v5.2
 * Supports UI Rendering and API Data Exchange
 */
function doGet(e) {
  // If no parameters, serve the Dispatch Hub UI
  if (!e || !e.parameter || Object.keys(e.parameter).length === 0) {
    return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Valley Express | Dispatch Hub')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  // API MODE: Return Spreadsheet Data as JSON
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheetName = e.parameter.sheet || "Jobs";
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) return jsonResponse({ status: "error", message: "Sheet not found" });

    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    
    // Return last 100 rows to keep it lightweight
    const results = data.slice(-100).reverse();

    return jsonResponse({
      status: "success",
      sheet: sheetName,
      headers: headers,
      data: results
    });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    
    // ROUTING: bulkPush (from Scrapers) or generic action
    if (payload.action === "bulkPush") {
      const sheet = ss.getSheetByName(payload.sheetName) || ss.insertSheet(payload.sheetName);
      const data = payload.data;
      
      if (data && data.length > 0) {
        // Initialize headers if new sheet
        if (sheet.getLastRow() === 0) {
          const headers = Object.keys(data[0]);
          sheet.appendRow(headers);
          sheet.getRange(1, 1, 1, headers.length).setBackground("#8C1D40").setFontColor("white").setFontWeight("bold");
        }
        
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        data.forEach(row => {
          const rowArray = headers.map(h => row[h] || "");
          sheet.appendRow(rowArray);
        });
        
        // Compact Sheet: Maintain Sovereign Integrity
        compactSheet(sheet);
      }
      return jsonResponse({ status: "success", count: data.length });
    }

    return jsonResponse({ status: "error", message: "Unknown action" });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HYPER-DRIVE COMPACTION
 * Strips empty rows and keeps the ledger unified at the top.
 */
function compactSheet(sheet) {
  const lastRow = sheet.getLastRow();
  const maxRows = sheet.getMaxRows();
  if (maxRows > lastRow + 5) {
    sheet.deleteRows(lastRow + 1, maxRows - lastRow - 5);
  }
}

function getDrivers() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Drivers");
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();

  return data.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function getSheetData(name) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();

  return data.map((row, index) => {
    let obj = { "__row__": index + 2 }; // Store row number for updates
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

/**
 * AI Decision Engine: Simulated VROOM Logic
 */
function findBestLoad(driverLat, driverLng) {
  const jobs = getSheetData("Jobs");
  let best = null;
  let bestScore = 0;

  jobs.forEach(job => {
    if (job["Status"] === "Available") {
      let score = 0;
      
      // Distance/Location Scoring
      if (job["Pickup City"] === "Phoenix") score += 50;
      if (job["Dropoff City"] === "Tucson") score += 40;
      if (job["Priority"] === "STAT") score += 100;

      // Pay Weighting
      score += parseInt(job["Pay"] || 0) / 10;

      if (score > bestScore) {
        bestScore = score;
        best = job;
      }
    }
  });

  return best;
}

/**
 * Automate Dispatch Flow
 */
function autoDispatch() {
  const drivers = getDrivers();
  // We only care about latest location per driver in a production env, 
  // but for this MVP we process the drivers list.
  
  drivers.forEach(driver => {
    if (driver["Status"] === "Active") {
      const bestJob = findBestLoad(driver["Latitude"], driver["Longitude"]);
      if (bestJob) {
        assignJob(driver, bestJob);
      }
    }
  });
}


function assignJob(driver, job) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Jobs");
  // Find column indices
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const statusIdx = headers.indexOf("Status") + 1;
  const assignedIdx = headers.indexOf("Assigned To") + 1;

  if (statusIdx > 0) {
    sheet.getRange(job.__row__, statusIdx).setValue("Assigned");
  }
  if (assignedIdx > 0) {
    sheet.getRange(job.__row__, assignedIdx).setValue(driver["Driver Name"]);
  }
}

/**
 * 🏺 AZ STATE CONTRACT INGESTION (Keyless RSS)
 * Fetches 100% free bid opportunities from the State of Arizona portal.
 */
function fetchStateContracts() {
  const azRssUrl = "https://app.az.gov/rss/bids"; 
  const response = UrlFetchApp.fetch(azRssUrl);
  const xml = response.getContentText();
  const document = XmlService.parse(xml);
  const entries = document.getRootElement().getChildren('channel')[0].getChildren('item');
  
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName("Gov Bids");
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet("Gov Bids");
    // UNIFIED HEADER: Timestamp, Title, Agency/Source, Deadline, Link, Status
    sheet.appendRow(["Timestamp", "Title", "Agency/Source", "Deadline", "Link", "Status"]);
    sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#FFC627").setFontColor("#8C1D40");
  }

  for (let i = 0; i < entries.length; i++) {
    let title = entries[i].getChildText('title');
    let link = entries[i].getChildText('link');
    sheet.appendRow([new Date(), title, "State of Arizona (RSS)", "N/A", link, "New"]);
  }
  
  console.log("✅ Ingested " + entries.length + " AZ State Contract opportunities into 'Gov Bids'.");
}

/**
 * 🏛️ SAM.GOV API INTEGRATION
 * Automatically fetches lucrative federal transport contracts in AZ.
 */
function fetchSamGovContracts() {
  const API_KEY = "PASTE_YOUR_API_KEY_HERE"; 
  const adminEmail = "jasminejackson1987@gmail.com, support@valleyexpresstransport.com, info@valleyexpresstransport.com"; 
  const stateCode = "AZ"; 
  
  const today = new Date();
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);
  const postedTo = Utilities.formatDate(today, Session.getScriptTimeZone(), "MM/dd/yyyy");
  const postedFrom = Utilities.formatDate(twoDaysAgo, Session.getScriptTimeZone(), "MM/dd/yyyy");
  
  const apiUrl = `https://api.sam.gov/prod/opportunities/v2/search?api_key=${API_KEY}&postedFrom=${postedFrom}&postedTo=${postedTo}&state=${stateCode}&limit=20`;
  
  try {
    const response = UrlFetchApp.fetch(apiUrl, { muteHttpExceptions: true });
    const json = JSON.parse(response.getContentText());
    if (json.error) {
      Logger.log("API Error: " + json.error.message);
      return;
    }
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName("Gov Bids");
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
      const uiLink = opp.uiLink || "https://sam.gov"; 
      
      const titleLower = title.toLowerCase();
      if (titleLower.includes("transport") || titleLower.includes("courier") || 
          titleLower.includes("freight") || titleLower.includes("delivery") || 
          titleLower.includes("logistics") || titleLower.includes("medical")) {
        
        sheet.appendRow([new Date(), title, agency, deadline, uiLink, "🚨 Needs Review"]);
        emailHtml += `<li><strong>${title}</strong><br/>Agency: ${agency}<br/>Deadline: ${deadline}<br/><a href="${uiLink}">View on SAM.gov</a></li><br/>`;
        newContractsFound++;
      }
    }
    
    if (newContractsFound > 0) {
      emailHtml += "</ul>";
      MailApp.sendEmail({ to: adminEmail, subject: `🚨 Valley Express: ${newContractsFound} New Gov Contracts Found`, htmlBody: emailHtml });
    }
  } catch (err) {
    Logger.log("Script crashed: " + err.toString());
  }
}

/**
 * 📝 GOOGLE DOCS AUTOMATION
 * Creates a formatted Google Doc with Valley Express branding.
 */
function createGoogleDoc(title, content) {
  try {
    const doc = DocumentApp.create(title);
    const body = doc.getBody();
    
    // Application of "Valley Express" Visual Identity
    const header = body.insertParagraph(0, title);
    header.setHeading(DocumentApp.ParagraphHeading.HEADING1)
          .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
          .setForegroundColor("#8C1D40"); // ASU Maroon
          
    body.appendParagraph("VALLEY EXPRESS LOGISTICS — PROPRIETARY SUBMISSION")
        .setItalic(true)
        .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
        .setForegroundColor("#666666");
        
    body.appendHorizontalRule();
    
    // Insert content with clean typography
    body.appendParagraph(content).setHeading(DocumentApp.ParagraphHeading.NORMAL);
    
    doc.saveAndClose();
    return { success: true, url: doc.getUrl(), id: doc.getId() };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * 🔱 PUSH MIGRATION: Injects Sheet data into Firebase Firestore
 */
function pushMigrationToFirebase() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName("Marketing Targets");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet 'Marketing Targets' not found.");
    return;
  }

  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  
  // Find column indices
  const companyIdx = headers.indexOf("Company");
  const jobTitleIdx = headers.indexOf("Job Title");
  const emailIdx = headers.indexOf("Email");
  const phoneIdx = headers.indexOf("Telephone Number");
  const statusIdx = headers.indexOf("Status");
  let syncIdx = headers.indexOf("Synced");

  if (syncIdx === -1) {
    sheet.getRange(1, headers.length + 1).setValue("Synced")
         .setBackground("#FFC627").setFontColor("#8C1D40").setFontWeight("bold");
    syncIdx = headers.length;
    headers.push("Synced");
  }

  let successCount = 0;
  
  data.forEach((row, i) => {
    const rowIndex = i + 2;
    const isSynced = row[syncIdx];
    
    if (!isSynced || isSynced === "") {
      const payload = {
        fields: {
          company: { stringValue: String(row[companyIdx] || "Unknown") },
          jobTitle: { stringValue: String(row[jobTitleIdx] || "N/A") },
          email: { stringValue: String(row[emailIdx] || "N/A") },
          phone: { stringValue: String(row[phoneIdx] || "N/A") },
          status: { stringValue: String(row[statusIdx] || "New") },
          lead_source: { stringValue: "B2B_INTERNAL" },
          migration_date: { stringValue: new Date().toISOString() }
        }
      };

      const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/leads`;
      const options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      };

      try {
        const response = UrlFetchApp.fetch(url, options);
        if (response.getResponseCode() === 200) {
          sheet.getRange(rowIndex, syncIdx + 1).setValue("YES");
          successCount++;
        }
      } catch (e) {
        Logger.log("Migration Error at row " + rowIndex + ": " + e.toString());
      }
    }
  });

  SpreadsheetApp.getUi().alert("🔱 Migration Complete: " + successCount + " leads pushed to Firebase.");
}

