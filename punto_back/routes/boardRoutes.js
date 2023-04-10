const express = require('express') // Importing the express module
const router = express.Router() // Creating an instance of an Express router
const boardsController = require('../controllers/boardsController') // Importing the boardsController module
const verifyJWT = require('../middleware/verifyJWT') // Importing the verifyJWT middleware

router.use(verifyJWT) // Use the verifyJWT middleware for all routes in this router

router.route('/') // Creating a route for the root endpoint
    .get(boardsController.getBoards)  // Adding a GET request handler to the root endpoint to get all boards
    .patch(boardsController.updateBoard)  // Adding a PATCH request handler to the root endpoint to update a board
    .delete(boardsController.deleteBoard) // Adding a DELETE request handler to the root endpoint to delete a board

router.route('/create') // Creating a route for create a new board
    .post(boardsController.createNewBoard) // Adding a POST request handler to the create endpoint to create a new board

module.exports = router // Exporting the router to be used by other parts of the application