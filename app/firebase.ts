import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE93O2Q6AtEUu3ZHUu75sT9hsnCib_C6E",
  authDomain: "titans-alliance-94958.firebaseapp.com",
  projectId: "titans-alliance-94958",
  storageBucket: "titans-alliance-94958.firebasestorage.app",
  messagingSenderId: "671716784350",
  appId: "1:671716784350:web:b7516eea8a987864e7aa4f",
  measurementId: "G-Y73YEN0B13",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
