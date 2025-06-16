

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADD2D_1WhHRxiYdB48tYWlZ11Mdcvh1dw",
    authDomain: "pages-auth-32f21.firebaseapp.com",
    projectId: "pages-auth-32f21",
    storageBucket: "pages-auth-32f21.firebasestorage.app",
    messagingSenderId: "978770090257",
    appId: "1:978770090257:web:8a4ff02a989ebb276cd4b0",
    measurementId: "G-13P7WS9Z74"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };