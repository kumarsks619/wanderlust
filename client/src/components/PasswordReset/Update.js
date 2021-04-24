import React, { useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { Alert } from 'react-bootstrap'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'

import './PasswordReset.css'
import { updateNewPassword } from '../../api/passwordReset'

const Update = ({ match }) => {
    const { userID, token } = match.params

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        if (newPassword === confirmNewPassword) {
            updateNewPassword(userID, token, newPassword)
                .then((response) => {
                    setLoading(false)
                    setError('')
                    setNewPassword('')
                    setConfirmNewPassword('')
                    setSuccess(response.data)
                })
                .catch((err) => {
                    setLoading(false)
                    setSuccess('')
                    setError(err.response.data)
                })
        } else {
            setError('Passwords must match!')
        }
    }

    return (
        <div className="passwordReset">
            <form onSubmit={handleUpdateSubmit}>
                <Typography variant="h4">Update Password</Typography>
                <Typography variant="h6" gutterBottom={true} color="textSecondary">
                    WanderLust
                </Typography>
                <TextField
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="passwordReset__inputField"
                />
                <TextField
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="passwordReset__inputField"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    className="passwordReset__submitBtn"
                >
                    Update
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
                {success && (
                    <Alert variant="success">
                        {success} Proceed to{' '}
                        <Link to="/user?redirect=login" style={{ color: '#dc3545' }}>
                            login
                        </Link>
                        .
                    </Alert>
                )}
            </form>
        </div>
    )
}

export default Update
