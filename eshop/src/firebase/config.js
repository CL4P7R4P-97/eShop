// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "reactshop-e99c1.firebaseapp.com",
  projectId: "reactshop-e99c1",
  storageBucket: "reactshop-e99c1.appspot.com",
  messagingSenderId: "490797074371",
  appId: "1:490797074371:web:0d5c7379d7cdbfae7b5f76",
  measurementId: "G-FYXN70Y03C"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db  = getFirestore(app);
export const storage = getStorage(app);
export default app;