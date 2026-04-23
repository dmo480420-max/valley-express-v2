// scripts/inject_test_lead.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDVzuXl5kVPbh0ErE0nOk3eJ7cOYVPjCGo",
  authDomain: "valley-express-os.firebaseapp.com",
  projectId: "valley-express-os",
  storageBucket: "valley-express-os.firebasestorage.app",
  messagingSenderId: "423108874305",
  appId: "1:423108874305:web:6ae0509fff3533d57676c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testLead = {
  company_name: "Banner Health (Neural Test)",
  industry: "Medical",
  pickup_address: "1111 E McDowell Rd, Phoenix, AZ 85006",
  dropoff_address: "7333 E Shea Blvd, Scottsdale, AZ 85260",
  pickup_zone: "Downtown Phoenix",
  dropoff_zone: "Scottsdale",
  rate: 185.00,
  miles: 14,
  rpm: 13.21,
  priority: "HOT",
  status: "available",
  timestamp: new Date().toISOString(),
  created_at: new Date().toISOString(),
  summary: "NEURAL SYNC TEST: High-priority medical courier required for STAT specimen delivery. Verify real-time link and sentinel update."
};

async function inject() {
  try {
    const docRef = await addDoc(collection(db, "jobs"), testLead);
    console.log("✅ [NEURAL PULSE] Banger Lead Injected successfully!");
    console.log("ID:", docRef.id);
    console.log("Check your Dashboard and AppFlowy Board now.");
    process.exit(0);
  } catch (e) {
    console.error("❌ Injection Failed:", e);
    process.exit(1);
  }
}

inject();
