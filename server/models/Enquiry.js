const { Schema, model } = require('mongoose')


const enquirySchema = new Schema({
    name: String,
    email: String,
    message: String,
    createdAt: String
})

module.exports = new model('Enquiry', enquirySchema)