import axios from 'axios'

import { SERVER_URL } from '../constants/urls'

export const sendPasswordResetRequest = (email) =>
    axios.post(`${SERVER_URL}/password-reset/request-reset/${email}`)

export const updateNewPassword = (userID, token, newPassword) =>
    axios.post(`${SERVER_URL}/password-reset/receive-new/${userID}/${token}`, {
        password: newPassword,
    })
