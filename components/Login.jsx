'use client'

import { signInWithEP, signInWithG } from '../authentication/auth'
import { useAuth } from '../authentication/AuthContext'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Box, Container, Typography, TextField, Button } from '@mui/material'

export default function Login(){

    const { userLoggedIn } = useAuth()
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const router = useRouter()

    useEffect(() => {
      if(userLoggedIn) {
        router.push('/home')
      }
    }, [userLoggedIn])

  
    const onSubmit = async (e) => {
      e.preventDefault()
      if(!isSigningIn) {
        setIsSigningIn(true)
        try {
          await signInWithEP(email, password)
          setIsSigningIn(false)
          
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
      /** <div>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
        </form>
        <button onClick={onGoogleSignIn}>Sign in with Google</button>
        <p>{errorMessage}</p>
        Don't have an account? <Link href='/register'>Register</Link>
      </div>**/
      <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '16px' }}
          >
            Login
          </Button>
        </form>
        <Button
          onClick={onGoogleSignIn}
          fullWidth
          variant="outlined"
          color="secondary"
          style={{ marginTop: '16px' }}
        >
          Sign in with Google
        </Button>
        {errorMessage && (
          <Typography color="error" style={{ marginTop: '16px' }}>
            {errorMessage}
          </Typography>
        )}
        <Typography style={{ marginTop: '16px' }}>
          Don't have an account?{' '}
          <Link href="/register">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
    )

    
  
  }