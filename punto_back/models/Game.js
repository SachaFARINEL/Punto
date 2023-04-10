const mongoose = require('mongoose')

// Define the schema for a game
const gameSchema = new mongoose.Schema({
    board: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hands: [
        {
            idPlayer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User' // The player is referenced to a User
            },
            cards: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Card',
                default: null // Cards are referenced to a Card schema and set to null by default
            }]
        }
    ],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        default: null // The game has no winner by default
    }
})

module.exports = mongoose.model('Game', gameSchema) // Export the Game model based on the schema above
