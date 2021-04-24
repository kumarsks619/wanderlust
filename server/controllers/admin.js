require('dotenv').config({ path: '../.env' })
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')
const Booking = require('../models/Booking')
const Enquiry = require('../models/Enquiry')
const Carousel = require('../models/Carousel')
const Advt = require('../models/Advt')
const { validateAdminRequest } = require('../utils/checkAuth')

const registerAdmin = async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 13)

    try {
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        })

        await newAdmin.save()
        return res.status(200).send({ message: 'Admin Registered Successfully!' })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const loginAdmin = async (req, res) => {
    const { username, password } = req.body

    if (username.trim() === '' || password.trim() === '')
        return res.status(400).send({
            error: 'Username/Password must not be empty!!!',
        })

    try {
        const foundAdmin = await Admin.findOne({ username })
        if (!foundAdmin)
            return res.status(400).send({
                error: 'No admin found with this username!!!',
            })

        const matchPassword = await bcrypt.compare(password, foundAdmin.password)
        if (!matchPassword)
            return res.status(400).send({
                error: 'Wrong credentials!!!',
            })

        const adminToken = jwt.sign(
            {
                username,
            },
            process.env.ADMIN_TOKEN_KEY,
            { expiresIn: '1h' }
        )

        return res.status(200).send({
            username,
            adminToken,
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getBookings = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const foundBookings = await Booking.find().populate('serviceBooked')
        return res.status(200).send(foundBookings)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getEnquiries = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const foundEnquiries = await Enquiry.find().sort({ createdAt: 'desc' })
        return res.status(200).send(foundEnquiries)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const deleteEnquiry = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const { enquiryID } = req.params
        await Enquiry.findByIdAndDelete(enquiryID)
        return res.status(200).send(enquiryID)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const addCarousel = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const { title, description, image } = req.body

        if (image.trim() === '')
            return res.status(200).send({
                error: 'Image must be provided!',
            })

        const newCarousel = new Carousel({
            title,
            description,
            image,
            createdAt: new Date().toISOString(),
        })

        await newCarousel.save()

        return res.status(200).send({
            newCarousel,
            message: 'New carousel image added!',
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getCarousel = async (_, res) => {
    try {
        const foundCarousels = await Carousel.find().sort({ createdAt: 'desc' })
        return res.status(200).send(foundCarousels)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const deleteCarousel = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(200).send({
            error,
        })

    const { carouselID } = req.params

    Carousel.findByIdAndDelete(carouselID)
        .then(() => {
            return res.status(200).send(carouselID)
        })
        .catch(() => {
            return res.status(500).send({
                message: 'Some error occurred on the server-side !!! Try Again.',
            })
        })
}

const addAdvtBanner = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const { image, link } = req.body

        if (image.trim() === '')
            return res.status(200).send({
                error: 'Image must be provided!',
            })

        const newAdvt = new Advt({
            image,
            link,
        })

        await newAdvt.save()

        return res.status(200).send({
            newAdvt,
            message: 'New advertisement banner added!',
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getAdvtBanner = async (_, res) => {
    try {
        const foundAdvts = await Advt.find()
        return res.status(200).send(foundAdvts)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const deleteAdvtBanner = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(200).send({
            error,
        })

    const { advtID } = req.params

    Advt.findByIdAndDelete(advtID)
        .then(() => {
            return res.status(200).send(advtID)
        })
        .catch(() => {
            return res.status(500).send({
                message: 'Some error occurred on the server-side !!! Try Again.',
            })
        })
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getBookings,
    getEnquiries,
    deleteEnquiry,
    addCarousel,
    getCarousel,
    deleteCarousel,
    addAdvtBanner,
    getAdvtBanner,
    deleteAdvtBanner,
}
