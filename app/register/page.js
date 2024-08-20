import React from 'react';
import Register from '../../components/Register';
import { AuthProvider } from '@/authentication/AuthContext';

export default function Page() {
    return (
        <AuthProvider>
            <Register/>
        </AuthProvider>
    )
}
