import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputIcon from '@material-ui/icons/Input'
import Alert from 'react-bootstrap/Alert'

import './AdminLogin.css'
import { AdminContext } from '../../../utils/Context/admin'
import { adminLogin } from '../../../api/admin'
import BackdropComp from '../../../utils/Comp/BackdropComp'


function AdminLogin() {
    const adminContext = useContext(AdminContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isBackdropOpen, setIsBackdropOpen] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setUsername("")
        setPassword("")
        setError("")

        try {
            const { data } = await adminLogin({
                username,
                password
            })

            adminContext.login(data)
        } catch (err) {
            setError(err.response.data.error)
        }
    }


    return (
        <>
            <div className="adminLogin">
                <form onSubmit={handleSubmit} className="adminLogin__form">
                    <h1>Admin-Panel</h1>
                    <TextField
                        required
                        error={ error ? true : false }
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Username"
                        placeholder="Admin Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        required
                        error={ error ? true : false }
                        type="password"
                        variant="outlined"
                        color="secondary"
                        label="Password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        size="large"
                        startIcon={<InputIcon />}
                    >
                        Login
                    </Button>
                    {
                        error && (
                            <Alert variant="danger" className="adminLogin__error">
                                {error}
                            </Alert>
                        )
                    }
                </form>
            </div>

            <BackdropComp 
                open={isBackdropOpen}
                setOpen={setIsBackdropOpen}
                content="You must be an ADMIN to access this page."
            />
        </>
    )
}

export default AdminLogin
