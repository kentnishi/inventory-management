'use client';
import React from 'react';
import { Button } from '@mui/material';
import { doSignOut } from '../authentication/auth';
import { useRouter } from 'next/navigation';

function LogoutButton() {
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await doSignOut();
            console.log('Signed out successfully');
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <Button variant="contained" color="primary" onClick={handleSignOut}>
            Log Out
        </Button>
    );
}

export default LogoutButton;