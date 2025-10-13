// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSS_PmR4GLV2FsSNy5fvBTMjkM5FyPdQw",
  authDomain: "project-8ddeb.firebaseapp.com",
  projectId: "project-8ddeb",
  storageBucket: "project-8ddeb.firebasestorage.app",
  messagingSenderId: "44960905783",
  appId: "1:44960905783:web:b2c81099980d0140db9db2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
