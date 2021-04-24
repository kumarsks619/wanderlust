const Destination = require('../models/createOwn/Destination')
const Price = require('../models/createOwn/Price')
const Custom = require('../models/createOwn/Custom')
const { validateAdminRequest, validateUserRequest } = require('../utils/checkAuth')
const { validateCustomInputs } = require('../utils/validators')

const addDestination = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const { name, price, spots, activities } = req.body

        if (name.trim() == '') {
            return res.status(400).send({
                error: 'Destination Name must be provided!',
            })
        }

        if (price < 1) {
            return res.status(400).send({
                error: 'Destination Price must be greater than zero!',
            })
        }

        if (spots.length < 1) {
            return res.status(400).send({
                error: 'There must be some Destination Spots!',
            })
        }

        let priceCheckFlag = true
        if (activities.length < 1) {
            return res.status(400).send({
                error: 'There must be some Activities!',
            })
        } else {
            activities.forEach((activity) => {
                if (activity.price < 1) {
                    priceCheckFlag = false
                }
            })
        }

        if (!priceCheckFlag) {
            return res.status(400).send({
                error: 'Destination Price must be greater than zero!',
            })
        }

        const newDestination = new Destination({
            name,
            price,
            spots,
            activities,
        })

        await newDestination.save()

        return res.status(200).send({
            newDestination,
            message: 'New Destination added!',
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getDestinations = async (req, res) => {
    try {
        const allDestinations = await Destination.find().sort({ name: 'asc' })
        return res.status(200).send(allDestinations)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const setPrices = async (req, res) => {
    const error = validateAdminRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    try {
        const {
            train,
            flight,
            road,
            ac,
            nonAc,
            local,
            twoStar,
            threeStar,
            fourStar,
            fiveStar,
            lodges,
            veg,
            nonVeg,
            jain,
        } = req.body

        if (
            train < 1 ||
            flight < 1 ||
            road < 1 ||
            ac < 1 ||
            nonAc < 1 ||
            local < 1 ||
            twoStar < 1 ||
            threeStar < 1 ||
            fourStar < 1 ||
            fiveStar < 1 ||
            lodges < 1 ||
            veg < 1 ||
            nonVeg < 1 ||
            jain < 1
        ) {
            return res.status(400).send({
                error: 'Price must be greater than zero!',
            })
        }

        const docsCount = await Price.countDocuments({})
        if (docsCount > 0) {
            const foundPrices = await Price.find({})
            const foundPrice = foundPrices[0]

            foundPrice.reachTransport.train = train
            foundPrice.reachTransport.flight = flight
            foundPrice.reachTransport.road = road

            foundPrice.spotTransport.ac = ac
            foundPrice.spotTransport.nonAc = nonAc
            foundPrice.spotTransport.local = local

            foundPrice.stay.twoStar = twoStar
            foundPrice.stay.threeStar = threeStar
            foundPrice.stay.fiveStar = fiveStar
            foundPrice.stay.lodges = lodges

            foundPrice.food.veg = veg
            foundPrice.food.nonVeg = nonVeg
            foundPrice.food.jain = jain

            await foundPrice.save()

            return res.status(200).send({
                message: 'Prices Updated!',
            })
        } else {
            const newPrice = new Price({
                reachTransport: { train, flight, road },
                spotTransport: { ac, nonAc, local },
                stay: { twoStar, threeStar, fourStar, fiveStar, lodges },
                food: { veg, nonVeg, jain },
            })

            await newPrice.save()

            return res.status(200).send({
                message: 'New Prices Added!',
            })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getPrices = async (req, res) => {
    try {
        const foundPrice = await Price.findOne({})
        return res.status(200).send(foundPrice)
    } catch (err) {
        return res.status(500).send(err)
    }
}

const createCustom = async (req, res) => {
    const error = validateUserRequest(req)

    if (error)
        return res.status(401).send({
            error,
        })

    const { customDetails } = req.body

    const { valid, errors } = validateCustomInputs(customDetails)

    if (!valid) return res.status(400).send({ errors })

    try {
        const newCustom = new Custom(customDetails)
        await newCustom.save()

        // re-fetching the just create Custom Package to display the summary to user
        const createdCustom = await Custom.findById(newCustom._id).populate('destination')

        return res.status(200).send({
            message:
                'Your Custom Package has been sent to our executives, they will reach back to you very soon with the Complete ITINERARY!',
            createdCustom,
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

const getAllCustom = async (req, res) => {
    try {
        const foundCustoms = await Custom.find({}).populate('user destination')
        return res.status(200).send(foundCustoms)
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    addDestination,
    getDestinations,
    setPrices,
    getPrices,
    createCustom,
    getAllCustom,
}
