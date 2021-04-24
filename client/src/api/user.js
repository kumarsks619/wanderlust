import axios from 'axios'

import { SERVER_USER_URL } from '../constants/urls'

export const userRegister = (userDetails) =>
    axios.post(`${SERVER_USER_URL}/register`, userDetails)

export const userLogin = (userDetails) =>
    axios.post(`${SERVER_USER_URL}/login`, userDetails)

export const bookService = (bookingDetails, serviceID, loggedInUser) =>
    axios.post(
        `${SERVER_USER_URL}/book/${serviceID}`,
        {
            ...bookingDetails,
            loggedInUser,
        },
        {
            headers: {
                authorization: `user ${loggedInUser.userToken}`,
            },
        }
    )

export const getBookings = (loggedInUser) =>
    axios.post(
        `${SERVER_USER_URL}/get-bookings`,
        {
            userID: loggedInUser.ID,
        },
        {
            headers: {
                authorization: `user ${loggedInUser.userToken}`,
            },
        }
    )

export const deleteBooking = (bookingID, loggedInUser) =>
    axios.delete(`${SERVER_USER_URL}/delete-booking/${bookingID}`, {
        headers: {
            authorization: `user ${loggedInUser.userToken}`,
        },
    })

export const sendEnquiry = (enquiry) =>
    axios.post(`${SERVER_USER_URL}/send-enquiry`, enquiry)

export const createCustom = (customDetails, loggedInUser) =>
    axios.post(
        `${SERVER_USER_URL}/create-own`,
        {
            customDetails,
        },
        {
            headers: {
                authorization: `user ${loggedInUser.userToken}`,
            },
        }
    )
