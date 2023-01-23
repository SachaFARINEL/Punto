const Board = require('../models/Board')
const asyncHandler = require('express-async-handler')

// @desc Get all boards
// @route GET /boards
// @access Private
const getBoards = asyncHandler(async (req, res) => {
    let value = undefined
    if (req.query.id) {
        value = await Board.findById(req.query.id).lean().exec()
    } else {
        value = await Board.find().lean()
    }

    if (value === undefined || (value instanceof Array && !value.length)) {
        return res.status(400).json({message: 'No boards found'})
    }

    res.json(value)
})


// @desc Create new board
// @route POST /boards/create
// @access Private
const createNewBoard = asyncHandler(async (req, res) => {
    const board = await Board.create(req.body);

    if (board) { //created
        res.status(201).json({message: `New board ${board.id} created`})
    } else {
        res.status(400).json({message: 'Something wrong happen'})
    }
})

// @desc Update a board
// @route PATCH /boards
// @access Private
const updateBoard = asyncHandler(async (req, res) => {
    const {id, cases} = req.body

    // Confirm data
    if (!id || !Array.isArray(cases) || !cases.length) {
        return res.status(400).json({message: 'id and at least a case is required'})
    }

    const board = await Board.findById(id).exec()

    if (!board) {
        return res.status(400).json({message: 'Board not found'})
    }

    board.cases = cases


    const updateBoard = await board.save()

    res.json({message: `Board ${updateBoard.id} updated with ${updateBoard.cases.length} case`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteBoard = asyncHandler(async (req, res) => {
    const {id} = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({message: 'Board ID Required'})
    }

    const board = await Board.findById(id).exec()

    if (!board) {
        return res.status(400).json({message: 'Board not found'})
    }

    const result = await board.deleteOne()

    const reply = `Board with ID ${result.id} deleted`

    res.json(reply)
})

module.exports = {
    getBoards,
    createNewBoard,
    updateBoard,
    deleteBoard
}