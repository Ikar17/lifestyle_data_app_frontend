import React, { createContext, useState, useContext } from 'react';
import { auth } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { BACKEND_URL } from '../constants/constants';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [role, setRole] = useState(localStorage.getItem("role") || "USER")

  const login = async (email, password) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setToken(userCredential.user.accessToken);
      localStorage.setItem("token", userCredential.user.accessToken);

      await axios.get(`${BACKEND_URL}/auth/role`, {
        headers:{
            "Authorization" : "Bearer " + userCredential.user.accessToken
        }
      })
      .then(function (response) {
        setRole(response.data);
        localStorage.setItem("role", response.data);
      })
      .catch(function (error) {
        throw new Error(error);
      })

      return true;
    }catch(error){
      return false;
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const injectToken = (token) => {
    if(token == null) return;
    setToken(token);
    localStorage.setItem("token", token)
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout, injectToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);