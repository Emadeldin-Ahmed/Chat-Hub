import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcgTq56Dfomp1VBDmHOpPtpqG2I9aOEjY",
  authDomain: "chaat-box.firebaseapp.com",
  projectId: "chaat-box",
  storageBucket: "chaat-box.firebasestorage.app",
  messagingSenderId: "523854461138",
  appId: "1:523854461138:web:7c2e500c58538433f7d50b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);