/**
 * 🔱 Valley Express | Aletheia Strike Controller
 * The autonomous engine that pulls raw leads from Firestore, 
 * runs Gemini AI Audits, and weaponizes them for the Strike Console.
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { auditLead } = require('./gemini-auditor');

// 🚨 Configuration
const SERVICE_ACCOUNT_PATH = './serviceAccountKey.json'; 

async function executeAuditStrike() {
    console.log("--------------------------------------------------");
    console.log("🔱 INITIATING ALETHEIA AUDIT STRIKE...");
    console.log("--------------------------------------------------");

    try {
        // Initialize Firebase Admin
        // This requires the serviceAccountKey.json you generated in the Firebase Console
        const serviceAccount = require(SERVICE_ACCOUNT_PATH);
        initializeApp({ credential: cert(serviceAccount) });
        const db = getFirestore();

        // 1. Fetch unverified leads
        console.log("[+] SCANNING FOR RAW INTELLIGENCE...");
        const rawLeadsRef = db.collection('leads_verified');
        const snapshot = await rawLeadsRef.where('audit_status', '==', 'pending').limit(5).get();

        if (snapshot.empty) {
            console.log("[!] NO NEW TARGETS IDENTIFIED. SYSTEM NOMINAL.");
            return;
        }

        console.log(`[+] IDENTIFIED ${snapshot.size} RAW TARGETS. STARTING AI AUDIT...`);

        // 2. Process each lead
        for (const doc of snapshot.docs) {
            const data = doc.data();
            console.log(`\n[🔍] AUDITING: ${data.title}`);

            const auditResult = await auditLead(data);
            
            console.log(`    ➔ Truth Score: ${auditResult.truth_score}%`);
            console.log(`    ➔ Sector: ${auditResult.sector}`);
            console.log(`    ➔ Decision: ${auditResult.recommended_action.toUpperCase()}`);

            // 3. Weaponize the doc (Update Firestore)
            await doc.ref.update({
                truth_score: auditResult.truth_score,
                sector: auditResult.sector,
                audit_insight: auditResult.justification,
                audit_status: "verified",
                recommended_action: auditResult.recommended_action,
                _audited_at: new Date().toISOString()
            });

            console.log(`[✅] TARGET WEAPONIZED & RADIATED TO CONSOLE.`);
        }

        console.log("\n--------------------------------------------------");
        console.log("🔱 STRIKE COMPLETE. CHECK YOUR CONSOLE FOR LIVE UPDATES.");
        console.log("--------------------------------------------------");

    } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND' && error.message.includes('serviceAccountKey.json')) {
            console.log("\n[!] CRITICAL: serviceAccountKey.json MISSING.");
            console.log("    1. Go to Firebase Console > Project Settings > Service Accounts.");
            console.log("    2. Click 'Generate new private key'.");
            console.log("    3. Save it as 'serviceAccountKey.json' in this folder.");
        } else {
            console.error("\n[!] STRIKE ABORTED:", error.message);
        }
    }
}

executeAuditStrike();
