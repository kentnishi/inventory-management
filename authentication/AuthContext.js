'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

// Create the AuthContext
export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({...user});
            
            const isEmail = user.providerData.some(provider => provider.providerId === 'password');
            setIsEmailUser(isEmail);
            setUserLoggedIn(true);

            const isGoogle = user.providerData.some(provider => provider.providerId === GoogleAuthProvider.PROVIDER_ID);
            setIsGoogleUser(isGoogle);
            
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const authContextvalue = {
        userLoggedIn,
        currentUser,
        isEmailUser,
        isGoogleUser,
        setCurrentUser
    };

    return (
        <AuthContext.Provider value={authContextvalue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}