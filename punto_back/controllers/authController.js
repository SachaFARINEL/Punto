const User = require('../models/User') // Import the User model
const bcrypt = require('bcryptjs') // Import bcrypt for password hashing
const jwt = require('jsonwebtoken') // Import jwt for token generation and verification
const asyncHandler = require('express-async-handler') // Import asyncHandler for handling asynchronous functions in Express routes

// @desc Login route handler
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body // Destructure email and password from the request body

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    // Find user with the provided email address
    const foundUser = await User.findOne({email}).lean().exec()

    // Check if the user exists and is active
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    // Compare the password with the stored hashed password
    const match = await bcrypt.compare(password, foundUser.password)

    // If password does not match, return unauthorized error
    if (!match) return res.status(401).json({message: 'Unauthorized'})

    // Generate access token with user email as payload
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )

    // Generate refresh token with user email as payload
    const refreshToken = jwt.sign(
        {"email": foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    // Set a secure http-only cookie with the refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: 'None', //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Return access token in response
    res.json({accessToken})
})

// @desc This function is used to refresh the access token when it expires and the user is still logged in
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    // Check if the jwt cookie exists, if not, return an Unauthorized error
    if (!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})

    // Get the refresh token from the jwt cookie
    const refreshToken = cookies.jwt

    // Verify the refresh token using the refresh token secret and decode the user's email
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            // If there is an error with verifying the token, return a Forbidden error
            if (err) return res.status(403).json({message: 'Forbidden'})

            // Find the user in the database using the decoded email from the refresh token
            const foundUser = await User.findOne({email: decoded.email}).exec()

            // If the user does not exist, return an Unauthorized error
            if (!foundUser) return res.status(401).json({message: 'Unauthorized'})

            // Create a new access token for the user with a 15-minute expiry time
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            )

            // Send the new access token to the client
            res.json({accessToken})
        })
    )
}

// @desc Logout function that clears the refresh token cookie and sends a message
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    // Check if cookie exists, if not return no content status
    if (!cookies?.jwt) return res.sendStatus(204) //No content

    // Clear the cookie
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})

    // Send a response with a message indicating the cookie has been cleared
    res.json({message: 'Cookie cleared'})
}

// Export the login, refresh, and logout functions for use in other parts of the app
module.exports = {
    login,
    refresh,
    logout
}