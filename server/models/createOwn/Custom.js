const { Schema, model, Types } = require('mongoose')

const activitySchema = new Schema({
    name: String,
    price: Number,
})

const customSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
        },
        destination: {
            type: Types.ObjectId,
            ref: 'Destination',
        },
        duration: {
            start: String,
            end: String,
        },
        startCity: String,
        endCity: String,
        reachAssistance: String,
        reachTransport: {
            mode: String,
            price: Number,
        },
        spotTransport: {
            mode: String,
            price: Number,
        },
        stay: {
            preference: String,
            price: Number,
        },
        food: {
            preference: String,
            price: Number,
        },
        activities: [activitySchema],
    },
    { timestamps: true }
)

module.exports = new model('Custom', customSchema)
