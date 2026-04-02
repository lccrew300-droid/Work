import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Updated for Realtime Database
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "first-c2bb0.firebaseapp.com",
  databaseURL: "https://first-c2bb0-default-rtdb.firebaseio.com",
  projectId: "first-c2bb0",
  storageBucket: "first-c2bb0.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
