const mongoose = require('mongoose')

// Define the schema for the "cards" collection
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

// Export a mongoose model based on the cardSchema
module.exports = mongoose.model('Card', cardSchema)