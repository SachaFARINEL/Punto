const express = require('express') // Importing the express module
const router = express.Router() // Creating an instance of an Express router
const usersController = require('../controllers/usersController') // Importing the usersController module
const verifyJWT = require('../middleware/verifyJWT') // Importing the verifyJWT middleware

// Middleware to verify JWT for non-POST requests
router.use(function (req, res, next) {
    if (req.method !== 'POST') {
        verifyJWT(req, res, next);
    } else {
        next();
    }
});

// User routes
router.route('/')
    .get(usersController.getAllUsers) // Get all users
    .post(usersController.createNewUser) // Create a new user
    .patch(usersController.updateUser) // Update a user
    .delete(usersController.deleteUser) // Delete a user

module.exports = router // Export router for use in app.js
