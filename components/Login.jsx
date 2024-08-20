'use client'

import { signInWithEP, signInWithG } from '../authentication/auth'
import { useAuth } from '../authentication/AuthContext'
import { useState } from 'react'
const Login = () => {

    const { userLoggedIn } = useAuth()
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
  
    const onSubmit = async (e) => {
      e.preventDefault()
      if(!isSigningIn) {
        setIsSigningIn(true)
        try {
          await signInWithEP(email, password)
        } catch (error) {
          setErrorMessage(error.message)
          setIsSigningIn(false)
        }
      }
    }
  
    const onGoogleSignIn = async (e) => {
      e.preventDefault()
      if(!isSigningIn) {
        setIsSigningIn(true)
        try {
          await signInWithG()
        } catch (error) {
          setErrorMessage(error.message)
          setIsSigningIn(false)
        }
      }
    }

    return (
      <div>
        {userLoggedIn && <Navigate to='/inventory' />}
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
        </form>
        <button onClick={onGoogleSignIn}>Sign in with Google</button>
        <p>{errorMessage}</p>
        <href to='/register'>Don't have an account? Register</href>
      </div>
    )

    
  
  }

  export default Login;