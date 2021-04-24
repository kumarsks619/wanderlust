import React, { useContext, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Alert from 'react-bootstrap/Alert'
import { v4 as uuid } from 'uuid'

import './BookingForm.css'
import { UserContext } from '../../../utils/Context/user'
import { bookService } from '../../../api/user'


function BookingForm({ setIsModalOpen, serviceID }) {
    const userContext = useContext(UserContext)
    const [responseMessage, setResponseMessage] = useState({})

    const initialInputValues = {
        name: "",
        email: "",
        contact: "",
        persons: 1
    }
    const [inputValues, setInputValues] = useState(initialInputValues)


    const handleOnChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        })
    }


    const doBooking = async (bookingDetails, serviceID, loggedInUser) => {
        let response = await bookService(bookingDetails, serviceID, loggedInUser)
        setResponseMessage(response.data)
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        if (!userContext.user) {
            setResponseMessage({
                errors: {
                    user: "Login first to do Bookings !!!"
                }
            })
            setIsModalOpen(true)
        } else {
            await doBooking(inputValues, serviceID, userContext.user)
                .catch(err => setResponseMessage(err.response.data))
        }
    }


    useEffect(() => {
        if (responseMessage.hasOwnProperty("message"))
            setInputValues(initialInputValues)
    }, [ responseMessage ])


    useEffect(() => {
        if (userContext.user)
            setResponseMessage({})
    }, [ userContext.user ])


    
    return (
        <form className="bookingForm" onSubmit={handleOnSubmit}>
            <Typography variant="h5">Book Your Seat</Typography>
            <TextField
                required 
                type="text"
                variant="standard"
                color="secondary"
                label="Name"
                placeholder="Your Full Name"
                name="name"
                value={inputValues.name}
                onChange={handleOnChange}
            />
            <TextField 
                type="email"
                variant="standard"
                color="secondary"
                label="Email"
                placeholder="Your Email Address"
                name="email"
                value={inputValues.email}
                onChange={handleOnChange}
            />
            <TextField
                required 
                type="tel"
                variant="standard"
                color="secondary"
                label="Contact"
                placeholder="Mobile Number"
                name="contact"
                value={inputValues.contact}
                onChange={handleOnChange}
            />
            <TextField
                required 
                type="number"
                variant="standard"
                color="secondary"
                label="Number of Persons"
                placeholder="Number of Seats to be Booked"
                name="persons"
                value={inputValues.persons}
                onChange={handleOnChange}
            />
            <Button type="submit" variant="contained" color="secondary">
                Book { inputValues.persons > 1 ? "Seats" : "a Seat" }
            </Button>
            {
                (responseMessage.hasOwnProperty("errors") || responseMessage.hasOwnProperty("message")) && (
                    responseMessage.hasOwnProperty("errors") ? (
                        Object.keys(responseMessage.errors).map(errorKey => (
                            <Alert variant="danger" key={uuid()}>{responseMessage.errors[errorKey]}</Alert>
                        ))
                    ) : (
                        <Alert variant="success">{responseMessage.message}</Alert>
                    )
                )
            }
        </form>
    )
}

export default BookingForm
