'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '../authentication/AuthContext'
import { createUserWithEP, signInWithEP } from '../authentication/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Box, Container, Typography, TextField, Button } from '@mui/material'

export default function Register() {

    const router = useRouter()

    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (userLoggedIn) {
            router.push('/home')
        }
    }, [userLoggedIn])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            try {
                await createUserWithEP(email, password)
                setIsRegistering(false)
            } catch (error) {
                setErrorMessage(error.message)
                setIsRegistering(false)
            }
        }
    }

    return (
        <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '16px' }}
          >
            Register
          </Button>
        </form>
        {errorMessage && (
          <Typography color="error" style={{ marginTop: '16px' }}>
            {errorMessage}
          </Typography>
        )}
        <Typography style={{ marginTop: '16px' }}>
          Already have an account?{' '}
          <Link href="/login">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
    )   

}