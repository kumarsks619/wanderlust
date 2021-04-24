require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

const advtData = require('./data/advts')
const bookingsData = require('./data/bookings')
const carouselsData = require('./data/carousels')
const enquiriesData = require('./data/enquiries')
const servicesData = require('./data/services')
const usersData = require('./data/users')
const Advt = require('./models/Advt')
const Booking = require('./models/Booking')
const Carousel = require('./models/Carousel')
const Enquiry = require('./models/Enquiry')
const Service = require('./models/Service')
const User = require('./models/User')

const app = express()
const PORT = process.env.PORT || 5000

// connecting to database
mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected!')
        return app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
    })
    .catch((err) => console.error(err.message))

// to do a complete remove and insert everything except admin collection
const fullReset = async () => {
    try {
        await Advt.deleteMany()
        await Booking.deleteMany()
        await Carousel.deleteMany()
        await Enquiry.deleteMany()
        await Service.deleteMany()
        await User.deleteMany()

        console.log('Database cleared!')

        await Service.insertMany(servicesData)
        await User.insertMany(usersData)
        await Booking.insertMany(bookingsData)
        await Carousel.insertMany(carouselsData)
        await Enquiry.insertMany(enquiriesData)
        await Advt.insertMany(advtData)

        console.log('Database Full Reset Successful!')
        process.exit()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

fullReset()
