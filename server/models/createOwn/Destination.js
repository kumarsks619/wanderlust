const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
    name: String,
    price: Number,
})

const destinationSchema = new Schema({
    name: String,
    price: Number,
    spots: [String],
    activities: [activitySchema],
})

module.exports = new model('Destination', destinationSchema)
