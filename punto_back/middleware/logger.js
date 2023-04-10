const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

/**
 * Log events with current timestamp and unique id
 *
 * @param {string} message - The message to log
 * @param {string} logFileName - The name of the log file to write to
 *
 * @returns {Promise<void>} - Promise that resolves when log is written successfully
 */
const logEvents = async (message, logFileName) => {
    // Format the current date and time
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    // Create a log item with the current date and time, a unique id and the message
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        // Check if the logs directory exists, if not create it
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            // Create the logs directory
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        // Append the log item to the log file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    // Log the request
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    // Log the request in the console
    console.log(`${req.method} ${req.path}`)
    // Call the next middleware
    next()
}

// Export the logger middleware and the logEvents function
module.exports = {logEvents, logger}