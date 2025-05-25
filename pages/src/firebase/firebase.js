
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyADD2D_1WhHRxiYdB48tYWlZ11Mdcvh1dw",
  authDomain: "pages-auth-32f21.firebaseapp.com",
  projectId: "pages-auth-32f21",
  storageBucket: "pages-auth-32f21.firebasestorage.app",
  messagingSenderId: "978770090257",
  appId: "1:978770090257:web:8a4ff02a989ebb276cd4b0",
  measurementId: "G-13P7WS9Z74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app , auth};
