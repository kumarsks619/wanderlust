const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        bookings: [Types.ObjectId],
    },
    {
        timestamps: true,
    }
)

module.exports = new model('User', userSchema)
