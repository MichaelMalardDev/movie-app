// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Import Firestore Database
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "movie-app-9bde6.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "movie-app-9bde6.firebasestorage.app",
  messagingSenderId: "161393473839",
  appId: "1:161393473839:web:9ca54aecbdd0057f3349da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);