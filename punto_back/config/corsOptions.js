// Import the list of allowed origins
const allowedOrigins = require('./allowedOrigins')

// Create a CORS options object with origin and other configuration options
const corsOptions = {
    // Check if the request origin is allowed, using the list of allowed origins
    origin: (origin, callback) => {
        // If the request origin is in the list of allowed origins or it is not set, allow the request
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            // Otherwise, deny the request and return an error
            callback(new Error('Not allowed by CORS'))
        }
    },
    // Allow sending and receiving cookies across domains
    credentials: true,
    // Set the HTTP response status code for preflight requests to 200
    optionsSuccessStatus: 200
}

// Export the CORS options object for use in other modules
module.exports = corsOptions
