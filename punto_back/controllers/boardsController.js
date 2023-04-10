const Board = require('../models/Board') // Import the Board model
const asyncHandler = require('express-async-handler') // Import asyncHandler for handling asynchronous functions in Express routes

// @desc Get all boards
// @route GET /boards
// @access Private
const getBoards = asyncHandler(async (req, res) => {
    let value = undefined

    // Check if a specific board ID is provided in the request query
    if (req.query.id) {
        // Find the board by the provided ID and return the lean version of the document
        value = await Board.findById(req.query.id).lean().exec()
    } else {
        // If no ID is provided, find all boards and return the lean versions of the documents
        value = await Board.find().lean()
    }

    // Check if the result is undefined or an empty array, if so return 400 error
    if (value === undefined || (value instanceof Array && !value.length)) {
        return res.status(400).json({message: 'No boards found'})
    }

    // Return the found board(s)
    res.json(value)
})


// @desc Handler function to create a new board
// @route POST /boards/create
// @access Private
const createNewBoard = asyncHandler(async (req, res) => {
    // Create a new board with the provided data
    const board = await Board.create(req.body);

    // If the board is created successfully, send a response with status 201
    if (board) {
        res.status(201).json({message: `New board ${board.id} created`})
    } else { // Otherwise, send a response with status 400
        res.status(400).json({message: 'Something wrong happen'})
    }
})

// @desc Update a board
// @route PATCH /boards
// @access Private
const updateBoard = asyncHandler(async (req, res) => {
    // Destructuring of the request
    const {id, cases} = req.body

    // Check if data is valid
    if (!id || !Array.isArray(cases) || !cases.length) {
        return res.status(400).json({message: 'id and at least a case is required'})
    }

    // Find board with provided id
    const board = await Board.findById(id).exec()

    // Check if board exists
    if (!board) {
        // If not, return 400 error
        return res.status(400).json({message: 'Board not found'})
    }

    // Update board cases
    board.cases = cases

    // Save board
    const updateBoard = await board.save()

    // Return updated board
    res.json({message: `Board ${updateBoard.id} updated with ${updateBoard.cases.length} case`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteBoard = asyncHandler(async (req, res) => {
    // Destructuring of the request
    const {id} = req.body

    // Check if data is valid
    if (!id) {
        // If not, return 400 error
        return res.status(400).json({message: 'Board ID Required'})
    }

    // Find board with provided id
    const board = await Board.findById(id).exec()

    // Check if board exists
    if (!board) {
        // If not, return 400 error
        return res.status(400).json({message: 'Board not found'})
    }

    // Delete board
    const result = await board.deleteOne()
    const reply = `Board with ID ${result.id} deleted`

    // Return deleted board
    res.json(reply)
})

// Export the functions
module.exports = {
    getBoards,
    createNewBoard,
    updateBoard,
    deleteBoard
}