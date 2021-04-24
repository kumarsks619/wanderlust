const Service = require('../models/Service')
const Booking = require('../models/Booking')
const { validateAdminRequest } = require('../utils/checkAuth')
const _ = require('lodash')

const addService = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    const {
        type,
        title,
        isSpecial,
        image,
        overview,
        highlights,
        itinerary,
        inclusions,
        exclusions,
        startDate,
        days,
        price,
    } = req.body

    if (
        type !== '' &&
        title.trim() !== '' &&
        overview.trim() !== '' &&
        highlights[0].trim() !== '' &&
        itinerary[0].trim() !== '' &&
        inclusions[0].trim() !== '' &&
        exclusions[0].trim() !== '' &&
        startDate !== null &&
        days &&
        price &&
        image
    ) {
        if (days < 0)
            return res.status(400).send({
                error: "Number of Days can't have NEGATIVE value!!!",
            })

        if (price <= 0)
            return res.status(400).send({
                error: "Price can't have ZERO or NEGATIVE value!!!",
            })

        try {
            const newService = new Service({
                type,
                title: title.trim(),
                isSpecial,
                overview: overview.trim(),
                highlights: highlights.map((highlight) => highlight.trim()),
                itinerary: itinerary.map((it) => it.trim()),
                inclusions: inclusions.map((inclusion) => inclusion.trim()),
                exclusions: exclusions.map((exclusion) => exclusion.trim()),
                startDate,
                days,
                price: Math.round(price),
                image,
                createdAt: new Date().toISOString(),
            })

            const addedService = await newService.save()

            return res.status(200).send({
                message: `${addedService.type.slice(0, -1)} Added Successfully!`,
                addedService,
            })
        } catch (err) {
            return res.status(500).send(err)
        }
    } else
        return res.status(400).send({
            error: 'All fields are required!!!',
        })
}

const getServices = async (req, res) => {
    try {
        const allServices = await Service.find().sort({ createdAt: 'desc' })
        return res.status(200).send(allServices)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const deleteService = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const serviceID = req.params.serviceID

        // now finding the Bookings for this service
        const foundBookings = await Booking.find({ serviceBooked: serviceID })

        let deleteBookingIDs = []
        foundBookings.map((booking) => {
            deleteBookingIDs.push(booking._id)
        })

        // deleting the associated Bookings with this Service
        const result = await Booking.deleteMany({ _id: { $in: [...deleteBookingIDs] } })
        if (result.deletedCount !== deleteBookingIDs.length)
            return res.status(500).send({
                error: 'There is some error while deleting the associated Bookings!!!',
            })

        // now finally deleting the Service
        await Service.findByIdAndDelete(serviceID)

        return res.status(200).send({
            deletedServiceID: serviceID,
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getService = async (req, res) => {
    const serviceID = req.params.serviceID
    try {
        const service = await Service.findById(serviceID)
        return res.status(200).send(service)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getTrending = async (req, res) => {
    try {
        const allBookings = await Booking.find()
        const groupedBookings = _.groupBy(
            allBookings,
            (bookings) => bookings.serviceBooked
        )
        const sortedServiceIDs = []
        _.orderBy(
            Object.keys(groupedBookings),
            (serviceID) =>
                groupedBookings[serviceID].reduce((acc, curr) => acc + curr.persons, 0),
            'desc'
        ).map((serviceID) => sortedServiceIDs.push(serviceID))
        const topTenServiceIDs = sortedServiceIDs.slice(0, 10)

        const foundTrendingServices = await Service.find({
            _id: { $in: topTenServiceIDs },
        })

        return res.status(200).send(foundTrendingServices)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    addService,
    getServices,
    deleteService,
    getService,
    getTrending,
}
