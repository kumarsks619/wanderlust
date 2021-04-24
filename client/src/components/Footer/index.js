import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Typography from '@material-ui/core/Typography'

import './Footer.css'
import { useForm } from '../../utils/Hook/useForm'
import { sendEnquiry } from '../../api/user'

function Footer() {
    const [successMsg, setSuccessMsg] = useState('')
    const initialInputValues = {
        name: '',
        email: '',
        message: '',
    }

    const {
        inputValues,
        handleOnChange,
        handleOnSubmit,
        result,
        errors,
        handleReset,
    } = useForm(initialInputValues, sendEnquiry)

    useEffect(() => {
        if (result.status === 200) {
            result.status = null
            setSuccessMsg(result.data.message)
            handleReset()
        }
    }, [result, handleReset])

    useEffect(() => {
        if (Object.keys(errors).length > 0) setSuccessMsg('')
    }, [errors])

    return (
        <div className="footer">
            <div className="footer__contentAndFormWrapper">
                <p>
                    <span>Plan</span> Your Holidays With Our Assistance,
                    <br />
                    JUST FILL IN YOUR <span>DETAILS</span>.
                </p>
                <Form onSubmit={handleOnSubmit}>
                    <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={inputValues.name}
                        onChange={handleOnChange}
                    />
                    <Form.Control
                        required
                        autoComplete="off"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={inputValues.email}
                        onChange={handleOnChange}
                    />
                    <Form.Control
                        required
                        as="textarea"
                        placeholder="Your Message or Enquiry"
                        rows={3}
                        name="message"
                        value={inputValues.message}
                        onChange={handleOnChange}
                    />
                    <div className="footer__formCheckbox">
                        <input type="checkbox" name="sendUpdates" />
                        <label>
                            Send me regular Updates and Newsletters about Plans and
                            Destinations.
                        </label>
                    </div>
                    <Button type="submit" variant="danger" size="lg">
                        Submit
                    </Button>
                    {Object.keys(errors).length > 0 &&
                        Object.keys(errors).map((key) => (
                            <Alert
                                variant="danger"
                                className="registerForm__message"
                                key={key}
                            >
                                {errors[key]}
                            </Alert>
                        ))}
                    {successMsg && (
                        <Alert variant="success" className="registerForm__message">
                            {successMsg}
                        </Alert>
                    )}
                </Form>
            </div>

            <div className="footer__creditsWrapper">
                <Typography variant="body1" className="footer__credits">
                    Copyright &copy; 2021 |{' '}
                    <a
                        href="https://www.linkedin.com/in/kumarsks"
                        target="_blank"
                        rel="noreferrer"
                    >
                        VeNoM
                    </a>
                </Typography>
            </div>
        </div>
    )
}

export default Footer
