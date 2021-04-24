const { Schema, model } = require('mongoose')

const advtModel = new Schema(
    {
        image: String,
        link: String,
    },
    { timestamps: true }
)

module.exports = new model('Advt', advtModel)
