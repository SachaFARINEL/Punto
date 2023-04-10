const mongoose = require('mongoose')

// Define board schema
const boardSchema = new mongoose.Schema({
    cases: [{
        type: Map, // Define data type as Map
        of: mongoose.Schema.Types.ObjectId, // Set the data type for the values of the Map as ObjectId
        ref: 'Card', // Reference the Card model for the ObjectId values
        default: null // Set the default value of the cases array to null
    }],
})

// Export the Board model with the boardSchema
module.exports = mongoose.model('Board', boardSchema)