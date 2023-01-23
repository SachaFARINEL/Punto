const Game = require('../models/Game')
const Board = require('../models/Board')
const User = require('../models/User')
const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')
const mongoose = require("mongoose");

// @desc Get games
// @route GET /games
// @access Private
const getGames = asyncHandler(async (req, res) => {
    let value = undefined
    if (req.query.id) {
        value = await Game.findById(req.query.id).lean().exec()
    } else {
        value = await Game.find().lean()
    }

    if (value === undefined || (value instanceof Array && !value.length)) {
        return res.status(400).json({message: 'No games found'})
    }

    res.json(value)
})

// @desc Create new game
// @route POST /games
// @access Private
const createNewGame = asyncHandler(async (req, res) => {
    const {board, hands} = req.body

    // Confirm data
    if (!board || !hands) {
        return res.status(400).json({message: 'A board and atleast a player is required'})
    }

    const duplicate = await Game.findOne({board}).lean().exec()

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate board'})
    }

    const gameObject = {board, hands}

    // Create and store new user
    const game = await Game.create(gameObject)

    if (game) { //created
        res.status(201).json({message: `New game ${game._id} created`})
    } else {
        res.status(400).json({message: 'Invalid game data received'})
    }
})


// @desc Update a user
// @route PATCH /users
// @access Private
const updateGame = asyncHandler(async (req, res) => {
    const {id, hands, winner} = req.body

    // Confirm data
    if (!id || !hands) {
        return res.status(400).json({message: 'All fields except winner are required'})
    }

    // Does the user exist to update?
    const game = await Game.findById(id).exec()

    if (!game) {
        return res.status(400).json({message: 'Game not found'})
    }


    game.hands = hands
    game.winner = winner

    const updatedGame = await game.save()

    res.json({message: `${updatedGame.id} updated`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteGame = asyncHandler(async (req, res) => {
    const {id} = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({message: 'Game ID Required'})
    }


    // Does the user exist to delete?
    const game = await Game.findById(id).exec()

    if (!game) {
        return res.status(400).json({message: 'Game not found'})
    }

    const result = await game.deleteOne()

    const reply = `Game with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getGames,
    createNewGame,
    updateGame,
    deleteGame
}