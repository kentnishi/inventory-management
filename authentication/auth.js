import { create } from '@mui/material/styles/createTransitions';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const createUserWithEP = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithEP = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signInWithG = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
}

export const doSignOut = async () => {
    return auth.signOut();
}


/**
export const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const changePassword = async (password) => {
    return updatePassword(auth.currentUser, password);
}

export emailVerification = async () => {
    return sendEmailVerification(auth.currentUser);
}
 */