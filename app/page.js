'use client'


import React, { useState } from 'react'

import { useAuth } from '../authentication/AuthContext'
import { signInWithEP } from '../authentication/auth'
import Login from '@/components/Login'
import { AuthProvider } from '@/authentication/AuthContext'

export default function LandingPage() {
    return (
        <div>
            <AuthProvider>
            <h1>Welcome to the Landing Page</h1>
            <p>Sign in to access the inventory</p>
            <Login />
            </AuthProvider>
        </div>
    )
}