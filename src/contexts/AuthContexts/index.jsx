
import React, { useState, useContext, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut 
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            return true;
        } catch (error) {
            console.error("Error signing out:", error);
            return false;
        }
    };

    const value = {
        currentUser,
        userLoggedIn,
        isLoading,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}