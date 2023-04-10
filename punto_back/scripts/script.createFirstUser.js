const User = require('../models/User')  // Importing the User model
const bcrypt = require("bcryptjs");  // Importing the bcrypt library for password hashing

const createFirstUser = async () => {  // Defining an async function called createFirstUser
    if (!(await User.find({email: 'farinel.sacha@gmail.com'}).exec()).length) {  // Checking if a user with email 'farinel.sacha@gmail.com' already exists
        let email = 'farinel.sacha@gmail.com'
        let username = 'SachaFARINEL'
        let password = 'test'
        let birthday = '27/10/1994'

        try {
            const hashedPwd = await bcrypt.hash(password, 10) // Hashing the password using bcrypt with 10 salt rounds
            const userObject = {email, username, "password": hashedPwd, birthday}  // Creating a new user object

            User.create(userObject)  // Creating a new user in the database
            console.log('User created')  // Logging a message indicating that a new user has been created
        } catch (err) {
            console.log(err)  // Logging the error if there was an issue creating the user
        }
    } else {
        console.log('User already created')  // Logging a message indicating that the user already exists
    }
}

module.exports = createFirstUser  // Exporting the createFirstUser function for use in other modules
