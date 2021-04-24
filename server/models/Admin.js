const { Schema, model } = require('mongoose')


const adminSchema = new Schema({
    username: String,
    password: String
})


module.exports = new model('Admin', adminSchema)