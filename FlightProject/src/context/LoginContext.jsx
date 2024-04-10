import React, {createContext,useState,useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



export const LoginContext=createContext(); 
// define all the functions and state variables you need
export function LoginProvider({children}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

      // Check if user is logged in on component mount
  useEffect(() => {
    console.log('useEffect called');
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    console.log(isLoggedIn)
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  
    const handleLogin = (e) => {
      e.preventDefault(); //preventing page reload
      if (username === 'Admin' && password === 'Admin@123') {
        // Redirect to home page
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true'); // Store login state in localStorage
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        // Show error message
        setError('Invalid credentials. Please try again.');
      }
    };
    const handleLogout = () => {
        setLoggedIn(false);
        setUsername('');
        localStorage.removeItem('loggedIn');
        setPassword('');
        setError('');
    };
    return(
        <LoginContext.Provider value={{username,password,setPassword,setUsername,error,setError,loggedIn,setLoggedIn,handleLogin,handleLogout}}>
            {children}
            <Snackbar open={showSuccessPopup} autoHideDuration={3000} onClose={() => setShowSuccessPopup(false)}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setShowSuccessPopup(false)} severity="success">
          Login Successful!
        </MuiAlert>
      </Snackbar>
        </LoginContext.Provider>
    )
}

