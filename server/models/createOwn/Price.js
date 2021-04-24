const { Schema, model } = require('mongoose')

const priceSchema = new Schema({
    reachTransport: {
        train: Number,
        flight: Number,
        road: Number,
    },
    spotTransport: {
        ac: Number,
        nonAc: Number,
        local: Number,
    },
    stay: {
        twoStar: Number,
        threeStar: Number,
        fourStar: Number,
        fiveStar: Number,
        lodges: Number,
    },
    food: {
        veg: Number,
        nonVeg: Number,
        jain: Number,
    },
})

module.exports = new model('Price', priceSchema)
