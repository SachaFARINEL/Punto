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

module.exports = {
    getAllCards
}