const express = require('express') // Importing the express module
const router = express.Router() // Creating an instance of an Express router
const path = require('path') // Importing the path module

// This route is used to serve the index.html file
router.get('^/$|/index(.html)?', (req, res) => {
    // Sending the index.html file to the client
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router // Exporting the router to be used by other parts of the application