'use client'

import React, { useState } from 'react'
import { useAuth } from '../authentication/AuthContext'
import { signInWithEP } from '../authentication/auth'
import { Navigate, Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate()

    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            try {
                await signInWithEP(email, password)
                navigate('/inventory')
            } catch (error) {
                setErrorMessage(error.message)
                setIsRegistering(false)
            }
        }
    }

    return (
        <div>
            {userLoggedIn && <Navigate to='/inventory' />}
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
            <p>{errorMessage}</p>
            <Link to='/login'>Already have an account? Login</Link>
        </div>
        
    )   

}
export default Register;