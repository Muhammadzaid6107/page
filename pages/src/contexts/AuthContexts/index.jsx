import { useState, useContext ,useEffect  } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
// const AuthContext = React.createContex(); // Typo in "Context"

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [ userLoggedIn , setUserLoggedIn] = useState(false);
    const [loding , setLoading] = useState(true);


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false)
    }

    const value = {
        currentUser,
        userLoggedIn,
        loding
    }
    return(
        
            <AuthContext.Provider value={value}>
                {!loding && children}
            </AuthContext.Provider>

    )

    
}