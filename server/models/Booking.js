const { Schema, model, Types } = require('mongoose')


const bookingSchema = new Schema({
    name: String,
    email: String,
    contact: Number,
    persons: Number,
    serviceBooked: {
        type: Types.ObjectId,
        ref: 'Service'
    },
    bookedBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
})


module.exports = new model('Booking', bookingSchema)

