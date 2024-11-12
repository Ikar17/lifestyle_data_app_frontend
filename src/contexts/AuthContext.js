import React, { createContext, useState, useContext } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  const login = async (email, password) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setToken(userCredential.user.accessToken);
      localStorage.setItem("token", userCredential.user.accessToken);
      return true;
    }catch(error){
      return false;
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem('token');
  };

  const injectToken = (token) => {
    if(token == null) return;
    setToken(token);
    localStorage.setItem("token", token)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, injectToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);