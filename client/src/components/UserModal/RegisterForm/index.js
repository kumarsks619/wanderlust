import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import Alert from 'react-bootstrap/Alert'

import { useForm } from '../../../utils/Hook/useForm'
import { userRegister } from '../../../api/user'


function RegisterForm() {
    const initialInputValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const {
        inputValues,
        handleOnChange,
        handleOnSubmit,
        result,
        errors,
        handleReset
    } = useForm(initialInputValues, userRegister)

    const [successMsg, setSuccessMsg] = useState("")


    useEffect(() => {
        if (result.status === 200) {
            result.status = null                    // to prevent infinite re-render loop
            setSuccessMsg(result.data.message)
            handleReset()
        }
    }, [result, handleReset])


    return (
        <form className="registerForm" onSubmit={handleOnSubmit} autoComplete="off">
            <TextField
                required
                error={ errors.firstName ? true : false }
                type="text"
                name="firstName"
                variant="outlined"
                color="secondary"
                label="First Name"
                value={inputValues.firstName}
                onChange={handleOnChange}
            />
            <TextField
                error={ errors.lastName ? true : false } 
                type="text"
                name="lastName"
                variant="outlined"
                color="secondary"
                label="Last Name"
                value={inputValues.lastName}
                onChange={handleOnChange}
            />
            <TextField
                required
                error={ errors.email ? true : false } 
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
                error={ errors.password ? true : false } 
                type="password"
                name="password"
                variant="outlined"
                color="secondary"
                label="Password"
                value={inputValues.password}
                onChange={handleOnChange}
            />
            <TextField
                required
                error={ errors.password ? true : false }  
                type="password"
                name="confirmPassword"
                variant="outlined"
                color="secondary"
                label="Confirm Password"
                value={inputValues.confirmPassword}
                onChange={handleOnChange}
            />
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<PlaylistAddCheckIcon />}
            >
                Sign Up
            </Button>
            {
                Object.keys(errors).length > 0 && (
                    Object.keys(errors).map(key => (
                        <Alert variant="danger" className="registerForm__message" key={key}>
                            {errors[key]}
                        </Alert>
                    ))
                )
            }
            {
                successMsg && (
                    <Alert variant="success" className="registerForm__message">
                        {successMsg}
                    </Alert>
                )
            }
        </form>
    )
}

export default RegisterForm
