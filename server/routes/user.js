const express = require('express')

const { createCustom } = require('../controllers/createOwn')
const {
    registerUser,
    loginUser,
    bookService,
    getBookings,
    deleteBooking,
    sendEnquiry,
} = require('../controllers/user')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/book/:serviceID', bookService)
router.post('/get-bookings', getBookings)
router.delete('/delete-booking/:bookingID', deleteBooking)
router.post('/send-enquiry', sendEnquiry)
router.route('/create-own').post(createCustom)

module.exports = router
