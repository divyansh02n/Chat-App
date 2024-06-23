import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4APghVviAU4pa9R5b7RF0wlC6b95N7Xs",
  authDomain: "reactchat-a8756.firebaseapp.com",
  projectId: "reactchat-a8756",
  storageBucket: "reactchat-a8756.appspot.com",
  messagingSenderId: "293844220406",
  appId: "1:293844220406:web:2ad7ee7d4c57a1a7132fd7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
