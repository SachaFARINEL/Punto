require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
const {logger} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const {logEvents} = require('./middleware/logger')
const cardsCreation = require('./scripts/script.cardsCreation')
const createFirstUser = require('./scripts/script.createFirstUser')
const PORT = process.env.PORT || 3500

console.log(`On ${process.env.NODE_ENV}`)

if (process.env.NODE_ENV !== 'test') {
    connectDB(process.env.DATABASE_URI)
}

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/auth', require('./routes/authRoutes'))

app.use('/users', require('./routes/userRoutes'))

app.use('/cards', require('./routes/cardRoutes'))

app.use('/boards', require('./routes/boardRoutes'))

app.use('/games', require('./routes/gameRoutes'))

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

app.use(errorHandler)

io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connection.once('open', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to MongoDB')
        server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

        createFirstUser()
        cardsCreation()
    }
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

module.exports = app