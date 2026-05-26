// ============================================================
// FIREBASE CONFIGURATION
// Ganti dengan konfigurasi Firebase project Anda
// ============================================================

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// ============================================================
// KONFIGURASI TOKO
// ============================================================
const SHOP_CONFIG = {
  name: "Ceria Busana",
  tagline: "Baju Anak & Daster Wanita Premium",
  whatsapp: "6281234567890", // Ganti dengan nomor WA admin
  address: "Indonesia",
  instagram: "@ceriabusana",
  currency: "Rp",
  shippingCost: 15000,
  freeShippingMin: 200000,
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, SHOP_CONFIG };
