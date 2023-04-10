const jwt = require('jsonwebtoken')

/**
 * Verify the JWT token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const verifyJWT = (req, res, next) => {
    // Get the auth header value
    const authHeader = req.headers.authorization || req.headers.Authorization

    // Check if the auth header is undefined
    if (!authHeader?.startsWith('Bearer ')) {
        // Return a 401 Unauthorized response
        return res.status(401).json({message: 'Unauthorized'})
    }

    // Get the token from the auth header
    const token = authHeader.split(' ')[1]

    // Verify the token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({message: 'Forbidden'})
            // Set the user email to the request object
            req.user = decoded.UserInfo.email
            // Call the next middleware
            next()
        }
    )
}

// Export the verifyJWT middleware
module.exports = verifyJWT