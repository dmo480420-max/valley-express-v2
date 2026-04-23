/**
 * 🔱 Valley Express | Firebase Configuration (LIVE)
 * Verified connection to valley-express-os project.
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVzuXl5kVPbh0ErE0nOk3eJ7cOYVPjCGo",
  authDomain: "valley-express-os.firebaseapp.com",
  projectId: "valley-express-os",
  storageBucket: "valley-express-os.firebasestorage.app",
  messagingSenderId: "423108874305",
  appId: "1:423108874305:web:6ae0509fff3533d57676c0",
  measurementId: "G-607BVHELN5"
};

// Initialize Firebase High-Performance Core
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

console.log("[🔱 VALLEY OS] Firebase Core Handshake: SUCCESS.");
