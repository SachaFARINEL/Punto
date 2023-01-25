const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')

// @desc Get all cards
// @route GET /cards
// @access Private
const getAllCards = asyncHandler(async (req, res) => {
    // Get all cards from MongoDB
    const cards = await Card.find().lean()

    // If no cards
    if (!cards?.length) {
        return res.status(400).json({message: 'No cards found'})
    }

    res.json(cards)
})

const shuffleAndDistribute = asyncHandler(async (req, res) => {
    const playersNumber = req.query.players
    console.log(playersNumber)
    const cards = await Card.find().lean()
    let deck = {}

    const cardsByColors = cards.reduce((acc, card) => {
        acc[card.color].push(card);
        return acc;
    }, {red: [], blue: [], green: [], yellow: []});

    switch (playersNumber) {
        case "2":
            deck = {
                1: [cardsByColors.red, cardsByColors.blue],
                2: [cardsByColors.yellow, cardsByColors.green]
            }
        case "3":
            break
        case "4":
            deck = {
                1: [cardsByColors.red],
                2: [cardsByColors.yellow],
                3: [cardsByColors.blue],
                4: [cardsByColors.green]
            }
        default:
            console.log('Sorry, you need to be at least 2 and max 4');
    }

    res.json(deck)


})

module.exports = {
    getAllCards,
    shuffleAndDistribute
}