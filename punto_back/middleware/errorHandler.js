const {logEvents} = require('./logger')

// Middleware that handles errors and sends an appropriate response
const errorHandler = (err, req, res, next) => {
    // Log the error message with the logger module
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')

    // Log the error stack trace in the console
    console.log(err.stack)

    // Set the HTTP status code of the response to either the status code of the response or 500 (server error)
    const status = res.statusCode ? res.statusCode : 500

    res.status(status)

    // Send a JSON response with an error message
    res.json({message: err.message})
}

module.exports = errorHandler