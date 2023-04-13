require('dotenv').config() // Importing the dotenv package to use the .env file.
const express = require('express') // Importing the express package.
const app = express() // Creating an express app.
const http = require("http") // Importing the http package.
const server = http.createServer(app) // Creating a server with the express app.
const SocketIO = require ('./class/SocketIO') // Importing the SocketIO class.
const path = require('path') // Importing the path package.
const {logger} = require('./middleware/logger') // Importing the logger middleware.
const errorHandler = require('./middleware/errorHandler') // Importing the error handler middleware.
const cookieParser = require('cookie-parser') // Importing the cookie parser middleware.
const cors = require('cors') // Importing the cors middleware.
const corsOptions = require('./config/corsOptions') // Importing the cors options.
const connectDB = require('./config/dbConn') // Importing the database connection function.
const mongoose = require('mongoose') // Importing the mongoose package.
const {logEvents} = require('./middleware/logger') // Importing the logger middleware.
const cardsCreation = require('./scripts/script.cardsCreation') // Importing the cards creation script.
const createFirstUser = require('./scripts/script.createFirstUser') // Importing the first user creation script.
const PORT = process.env.PORT || 3500 // Setting the port.

console.log(`On ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV !== 'test') { // If the environment is not test.
    connectDB(process.env.DATABASE_URI) // Connecting to the database.
}

app.use(logger) // Using the logger middleware.

app.use(cors(corsOptions)) // Using the cors middleware.

app.use(express.json()) // Using the express json middleware.

app.use(cookieParser()) // Using the cookie parser middleware.

app.use('/', express.static(path.join(__dirname, 'public'))) // Using the express static middleware.

app.use('/', require('./routes/root')) // Using the root route.

app.use('/auth', require('./routes/authRoutes')) // Using the auth route.

app.use('/users', require('./routes/userRoutes')) // Using the user route.

app.use('/cards', require('./routes/cardRoutes')) // Using the card route.

app.use('/boards', require('./routes/boardRoutes')) // Using the board route.

app.use('/games', require('./routes/gameRoutes')) // Using the game route.

// Handling 404 errors.
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler) // Using the error handler middleware.

const socket = new SocketIO(server) // Creating a new SocketIO instance.
socket.start() // Starting the SocketIO instance.

// Handling the connection to the database.
mongoose.connection.once('open', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to MongoDB')
        server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

        createFirstUser()
        cardsCreation()
    }
})

// Handling the connection error to the database.
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

// Handling the disconnection from the database.
module.exports = app