const rateLimit = require('express-rate-limit') // https://www.npmjs.com/package/express-rate-limit
const {logEvents} = require('./logger') // Import the logEvents function from the logger module

/**
 * Rate limit login requests to 5 per minute
 * @type {RateLimitRequestHandler}
 * @property {number} windowMs - The time window in milliseconds
 * @property {number} max - The maximum number of requests allowed in the time window
 * @property {string} message - The message to send when the rate limit is exceeded
 * @property {function} handler - The function to call when the rate limit is exceeded
 * @property {boolean} standardHeaders - Whether to return rate limit info in the `RateLimit-*` headers
 * @property {boolean} legacyHeaders - Whether to disable the `X-RateLimit-*` headers
 *
 */
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 login requests per `window` per minute
    message:
        {message: 'Too many login attempts from this IP, please try again after a 60 second pause'},
    // Custom handler to log the error message and send a JSON response
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Export the loginLimiter middleware
module.exports = loginLimiter