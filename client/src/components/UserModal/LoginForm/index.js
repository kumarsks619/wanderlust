import React, { useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom'

import { useForm } from '../../../utils/Hook/useForm'
import { userLogin } from '../../../api/user'
import { UserContext } from '../../../utils/Context/user'

function LoginForm({ handleModalClose }) {
    const userContext = useContext(UserContext)

    const initialInputValues = {
        email: '',
        password: '',
    }
    const {
        inputValues,
        handleOnChange,
        handleOnSubmit,
        result,
        errors,
        handleReset,
    } = useForm(initialInputValues, userLogin)

    useEffect(() => {
        if (result.status === 200) {
            result.status = null
            handleReset()
            handleModalClose()
            userContext.userLogin(result.data)
        }
    }, [result, handleReset, handleModalClose, userContext])

    return (
        <form className="loginForm" onSubmit={handleOnSubmit} autoComplete="off">
            <TextField
                required
                error={errors.email ? true : false}
                type="email"
                name="email"
                variant="outlined"
                color="secondary"
                label="Email Address"
                value={inputValues.email}
                onChange={handleOnChange}
            />
            <TextField
                required
                error={errors.password ? true : false}
                type="password"
                name="password"
                variant="outlined"
                color="secondary"
                label="Password"
                value={inputValues.password}
                onChange={handleOnChange}
            />
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<MeetingRoomIcon />}
            >
                Login
            </Button>
            {Object.keys(errors).length > 0 &&
                Object.keys(errors).map((key) => (
                    <Alert variant="danger" className="loginForm__message" key={key}>
                        {errors[key]}
                    </Alert>
                ))}

            <Link to="/password-reset/forgot" className="loginForm__forgot">
                Forgot password?
            </Link>
        </form>
    )
}

export default LoginForm
