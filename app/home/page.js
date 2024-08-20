import React from 'react';
import Inventory from '../../components/Inventory';
import SignOut from '../../components/SignOut';
import { AuthProvider } from '@/authentication/AuthContext';


export default function Page() {
    return (
        <div>
            <AuthProvider>
            <SignOut/>
            </AuthProvider>
            <Inventory/>
        </div>
    )
}