'use client'


import React, { useState } from 'react'

import { useAuth } from '../authentication/AuthContext'
import { signInWithEP } from '../authentication/auth'
import Login from '@/components/Login'
import { AuthProvider } from '@/authentication/AuthContext'

export default function LandingPage() {
    return (
            <AuthProvider>
            <Login />
            </AuthProvider>
    )
}