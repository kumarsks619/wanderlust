require('dotenv').config({ path: '../.env' })
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Booking = require('../models/Booking')
const Enquiry = require('../models/Enquiry')
const {
    validateRegisterInputs,
    validateLoginInputs,
    validateBookingInputs,
    validateEnquiryInputs,
} = require('../utils/validators')
const { validateUserRequest } = require('../utils/checkAuth')

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body

    const { valid, errors } = validateRegisterInputs(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    )

    if (!valid) return res.status(400).send({ errors })

    try {
        const foundUser = await User.findOne({ email })
        if (foundUser)
            return res.status(400).send({
                errors: {
                    email: 'Email address already exists!!! Proceed to Login.',
                },
            })

        const hashedPassword = await bcrypt.hash(password, 13)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        await newUser.save()
        return res.status(200).send({
            message: 'User registered successfully! Proceed to Login.',
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const { valid, errors } = validateLoginInputs(email, password)

    if (!valid) return res.status(400).send({ errors })

    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser)
            return res.status(400).send({
                errors: {
                    email: 'No user exists with this email address!!! Sign Up first.',
                },
            })

        const matchPassword = await bcrypt.compare(password, foundUser.password)
        if (!matchPassword)
            return res.status(400).send({
                errors: {
                    password: 'Wrong credentials!!!',
                },
            })

        const userToken = jwt.sign(
            {
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                email,
            },
            process.env.USER_TOKEN_KEY,
            { expiresIn: '1h' }
        )

        return res.status(200).send({
            ID: foundUser._id,
            email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userToken,
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const bookService = async (req, res) => {
    const error = validateUserRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    const serviceID = req.params.serviceID
    const { loggedInUser, name, email, contact, persons } = req.body

    const { valid, errors } = validateBookingInputs(name, email, contact, persons)

    if (!valid) return res.status(400).send({ errors })

    try {
        const foundUser = await User.findOne({ email: loggedInUser.email })
        if (!foundUser)
            return res.status(404).send({
                errors: {
                    user: 'User NOT Found!!! 404',
                },
            })

        // checking if the same service is already been booked by the same user
        const foundBooking = foundUser.bookings.find(
            (bookingID) => String(bookingID) === String(serviceID)
        )
        if (foundBooking)
            return res.status(400).send({
                errors: {
                    user: 'Already Booked from this Account!!!',
                },
            })

        foundUser.bookings.push(serviceID)
        await foundUser.save()

        const newBooking = new Booking({
            name,
            email,
            contact,
            persons,
            serviceBooked: serviceID,
            bookedBy: loggedInUser.ID,
        })

        await newBooking.save()

        return res.status(200).send({
            message: 'Booked Successfully! Pack your Bags.',
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getBookings = async (req, res) => {
    const error = validateUserRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const { userID } = req.body

        // now finding the bookings of the user
        const foundBookings = await Booking.find({ bookedBy: userID }).populate(
            'serviceBooked'
        )

        return res.status(200).send(foundBookings)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const deleteBooking = async (req, res) => {
    const error = validateUserRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const { bookingID } = req.params

        const foundBooking = await Booking.findById(bookingID)
        if (!foundBooking)
            return res.status(404).send({
                error: 'Booking NOT Found!!! 404',
            })

        // now finding the user who have done this booking
        const foundUser = await User.findById(foundBooking.bookedBy)
        if (!foundUser)
            return res.status(404).send({
                error: 'Booked by User NOT Found!!! 404',
            })

        // removing the serviceID from the bookings array in the User
        foundUser.bookings = foundUser.bookings.filter(
            (serviceID) => String(serviceID) !== String(foundBooking.serviceBooked)
        )
        await foundUser.save()

        // now deleting the booking itself
        await Booking.findByIdAndDelete(bookingID)

        return res.status(200).send(bookingID)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const sendEnquiry = async (req, res) => {
    const { name, email, message } = req.body

    const { valid, errors } = validateEnquiryInputs(name, email, message)

    if (!valid) return res.status(400).send({ errors })

    try {
        const newEnquiry = new Enquiry({
            name: name.trim(),
            email,
            message: message.trim(),
            createdAt: new Date().toISOString(),
        })

        await newEnquiry.save()

        return res.status(200).send({
            message: "Enquiry Sent! We'll get back to you soon.",
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    registerUser,
    loginUser,
    bookService,
    getBookings,
    deleteBooking,
    sendEnquiry,
}
