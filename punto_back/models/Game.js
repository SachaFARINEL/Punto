const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    board: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    hands: [
        {
            idPlayer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            cards: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Card',
                default: null
            }]
        }
    ],
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
})

module.exports = mongoose.model('Game', gameSchema)