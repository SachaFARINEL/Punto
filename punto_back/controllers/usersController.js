const User = require('../models/User') // Import User model
const asyncHandler = require('express-async-handler') // Import asyncHandler for handling asynchronous functions in Express routes
const bcrypt = require('bcryptjs') // Import bcryptjs for hashing passwords

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users
    if (!users?.length) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'No users found'})
    }

    // Return 200 status code and users
    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    // Get data from request body
    const {email, username, password, birthday} = req.body

    // Confirm data
    if (!email || !username || !password || !birthday) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'All fields are required'})
    }

    // Check for duplicate username
    const duplicate = await User.findOne({email}).lean().exec()

    if (duplicate) {
        // Return 409 status code and error message
        return res.status(409).json({message: 'Duplicate username'})
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // Create user object
    const userObject = {email, username, "password": hashedPwd, birthday}

    // Create and store new user
    const user = await User.create(userObject)

    // If user created
    if (user) {
        // Return 201 status code and message
        res.status(201).json({message: `New user ${email} created`})
    } else {
        // Return 400 status code and error message
        res.status(400).json({message: 'Invalid user data received'})
    }
})


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    // Get data from request body
    const {id, email, username, birthday, active, password} = req.body

    // Confirm data
    if (!id || !email || !username || !birthday) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'All fields except password are required'})
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    // If user not found
    if (!user) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'User not found'})
    }

    // Check for duplicate
    const duplicate = await User.findOne({email}).lean().exec()

    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate email'})
    }

    user.email = email
    user.username = username
    user.birthday = birthday
    user.active = active

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    // Save updated user
    const updatedUser = await user.save()

    // Return 200 status code and message
    res.json({message: `${updatedUser.email} updated`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    // Get data from request body
    const {id} = req.body

    // Confirm data
    if (!id) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'User ID Required'})
    }


    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    // If user not found
    if (!user) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'User not found'})
    }

    // Delete user
    const result = await user.deleteOne()
    const reply = `Email ${result.email} with ID ${result._id} deleted`

    // Return 200 status code and message
    res.json(reply)
})

// Export functions
module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}