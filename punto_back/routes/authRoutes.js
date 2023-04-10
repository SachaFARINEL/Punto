const express = require('express') // Importing the express module
const router = express.Router() // Creating an instance of an Express router
const authController = require('../controllers/authController') // Importing the authController module
const loginLimiter = require('../middleware/loginLimiter') // Importing the loginLimiter middleware

router.route('/') // Creating a route for the root endpoint
    .post(loginLimiter, authController.login) // Adding a POST request handler to the root endpoint for user authentication

router.route('/refresh') // Creating a route for the refresh endpoint
    .get(authController.refresh) // Adding a GET request handler to the refresh endpoint for refreshing user authentication

router.route('/logout') // Creating a route for the logout endpoint
    .post(authController.logout) // Adding a POST request handler to the logout endpoint for user logout

module.exports = router // Exporting the router to be used by other parts of the application
