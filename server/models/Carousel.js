const { Schema, model } = require('mongoose')


const carouselSchema = new Schema({
    title: "",
    description: "",
    image: String,
    createdAt: String
})


module.exports = new model('Carousel', carouselSchema)