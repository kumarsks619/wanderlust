import React, { useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { Alert } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'

import './PasswordReset.css'
import { sendPasswordResetRequest } from '../../api/passwordReset'

const Forgot = () => {
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleForgotSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        if (email.trim()) {
            sendPasswordResetRequest(email)
                .then((response) => {
                    setLoading(false)
                    setError('')
                    setEmail('')
                    setSuccess(response.data)
                })
                .catch((err) => {
                    setLoading(false)
                    setSuccess('')
                    setError(err.response.data)
                })
        }
    }

    return (
        <div className="passwordReset">
            <form onSubmit={handleForgotSubmit}>
                <Typography variant="h4">Forgot Password</Typography>
                <Typography variant="h6" gutterBottom={true} color="textSecondary">
                    WanderLust
                </Typography>
                <TextField
                    type="email"
                    variant="outlined"
                    color="secondary"
                    label="Email Address"
                    helperText="Enter email associated with your account"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="passwordReset__inputField"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="passwordReset__submitBtn"
                >
                    Submit
                </Button>

                {loading && (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <CircularProgress
                            color="secondary"
                            size={60}
                            style={{ color: '#dc3545' }}
                        />
                    </div>
                )}
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
            </form>
        </div>
    )
}

export default Forgot
