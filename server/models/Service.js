const { Schema, model, Types } = require('mongoose')


const serviceSchema = new Schema({
    type: String,
    title: String,
    isSpecial: Boolean,
    overview: String,
    highlights: [String],
    itinerary: [String],
    inclusions: [String],
    exclusions: [String],
    startDate: String,
    days: Number,
    price: Number,
    image: String,
    createdAt: String
})


module.exports = new model('Service', serviceSchema)