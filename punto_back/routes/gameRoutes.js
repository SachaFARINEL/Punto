const express = require('express') // Importing the express module
const router = express.Router() // Creating an instance of an Express router
const gamesController = require('../controllers/gamesController') // Importing the gamesController module
const verifyJWT = require('../middleware/verifyJWT') // Importing the verifyJWT middleware

router.use(verifyJWT) // Use the verifyJWT middleware for all routes in this router

router.route('/') // Creating a route for the root endpoint
    .get(gamesController.getGames) // Adding a GET request handler to the root endpoint to get all games
    .post(gamesController.createNewGame) // Adding a POST request handler to the root endpoint to create a new game
    .patch(gamesController.updateGame) // Adding a PATCH request handler to the root endpoint to update a game
    .delete(gamesController.deleteGame) // Adding a DELETE request handler to the root endpoint to delete a game

module.exports = router // Exporting the router to be used by other parts of the application