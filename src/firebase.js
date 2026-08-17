import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdVwnFW3mKYXGjVpQEuLKagIpIjRKY03A",
  authDomain: "teacherchyma-db300.firebaseapp.com",
  projectId: "teacherchyma-db300",
  storageBucket: "teacherchyma-db300.firebasestorage.app",
  messagingSenderId: "1095428841790",
  appId: "1:1095428841790:web:5dbb5ca0cb83e9f812cc6f",
  measurementId: "G-HSKRSKGF8N"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_FIREBASE_API_KEY" &&
  firebaseConfig.projectId !== "YOUR_PROJECT_ID"
);

let app = null;
let db = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (err) {
    console.warn("Firebase initialization notice:", err);
  }
}

export { app, db, auth };
