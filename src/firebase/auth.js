
import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithEmailAndPassword, 
  updatePassword 
} from "firebase/auth";


const errorMessages = {
  "auth/email-already-in-use": "This email is already registered. Please use a different email.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "default": "An error occurred. Please try again.",
"auth/invalid-credential": "email and password are not register"
};


export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const friendlyError = errorMessages[error.code] || errorMessages.default;
    throw new Error(friendlyError);
  }
};

export const doSignInUserWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);

  } catch (error) {
    const friendlyError = errorMessages[error.code] || errorMessages.default;
    throw new Error(friendlyError);
  }
};