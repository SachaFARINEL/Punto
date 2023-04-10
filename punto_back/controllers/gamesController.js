const Game = require('../models/Game') // Import Game model
const asyncHandler = require('express-async-handler') // Import asyncHandler for handling asynchronous functions in Express routes

// @desc Get games
// @route GET /games
// @access Private
const getGames = asyncHandler(async (req, res) => {
    // Initialize value
    let value = undefined
    // If id is provided
    if (req.query.id) {
        // Get game from MongoDB
        value = await Game.findById(req.query.id).lean().exec()
    } else {
        // Get all games from MongoDB
        value = await Game.find().lean()
    }

    // If no games
    if (value === undefined || (value instanceof Array && !value.length)) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'No games found'})
    }

    // Return 200 status code and games
    res.json(value)
})

// @desc Create new game
// @route POST /games
// @access Private
const createNewGame = asyncHandler(async (req, res) => {
    // Get data from request body
    const {board, hands} = req.body

    // Confirm data
    if (!board || !hands) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'A board and atleast a player is required'})
    }

    // Check if board already exists
    const duplicate = await Game.findOne({board}).lean().exec()

    // If board already exists
    if (duplicate) {
        // Return 409 status code and error message
        return res.status(409).json({message: 'Duplicate board'})
    }

    // Create game object
    const gameObject = {board, hands}

    // Create game in MongoDB
    const game = await Game.create(gameObject)

    // If game created
    if (game) {
        // Return 201 status code and message
        res.status(201).json({message: `New game ${game._id} created`})
    } else {
        // Return 400 status code and error message
        res.status(400).json({message: 'Invalid game data received'})
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateGame = asyncHandler(async (req, res) => {
    // Get data from request body
    const {id, hands, winner} = req.body

    // Confirm data
    if (!id || !hands) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'All fields except winner are required'})
    }

    // Does the game exist to update?
    const game = await Game.findById(id).exec()

    // If game does not exist
    if (!game) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'Game not found'})
    }

    // Update game
    game.hands = hands
    game.winner = winner

    // Save game
    const updatedGame = await game.save()

    // Return 200 status code and message
    res.json({message: `${updatedGame.id} updated`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteGame = asyncHandler(async (req, res) => {
    // Get data from request body
    const {id} = req.body

    // Confirm data
    if (!id) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'Game ID Required'})
    }

    // Does the game exist to delete?
    const game = await Game.findById(id).exec()

    // If game does not exist
    if (!game) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'Game not found'})
    }

    // Delete game
    const result = await game.deleteOne()
    const reply = `Game with ID ${result._id} deleted`

    // Return 200 status code and message
    res.json(reply)
})

// Export functions
module.exports = {
    getGames,
    createNewGame,
    updateGame,
    deleteGame
}