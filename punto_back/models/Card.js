const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        trim: true
    },
    color: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Card', cardSchema)