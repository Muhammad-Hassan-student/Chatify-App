// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatify-e9ea4.firebaseapp.com",
  projectId: "chatify-e9ea4",
  storageBucket: "chatify-e9ea4.firebasestorage.app",
  messagingSenderId: "34376482732",
  appId: "1:34376482732:web:0805a4df415a7fd12f0409",
  measurementId: "G-FSKGL9M3QP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
