const express = require('express') // Importing the express module
const router = express.Router() // Creating an instance of an Express router
const cardsController = require('../controllers/cardsController') // Importing the cardsController module
const verifyJWT = require('../middleware/verifyJWT') // Importing the verifyJWT middleware

router.use(verifyJWT) // Use the verifyJWT middleware for all routes in this router

router.route('/') // Creating a route for the root endpoint
    .get(cardsController.getAllCards) // Adding a GET request handler to the root endpoint to get all cards

router.route('/shuffleAndDistribute') // Creating a route for the root endpoint
    .get(cardsController.shuffleAndDistribute) // Adding a GET request handler to the root endpoint to get decks

module.exports = router