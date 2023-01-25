const User = require('../models/User')
const bcrypt = require("bcryptjs");

const createFirstUser = async () => {
    if (!(await User.find({email: 'farinel.sacha@gmail.com'}).exec()).length) {
        let email = 'farinel.sacha@gmail.com'
        let username = 'SachaFARINEL'
        let password = 'test'
        let birthday = '27/10/1994'

        try {
            const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
            const userObject = {email, username, "password": hashedPwd, birthday}

            User.create(userObject)
            console.log('User created')
        } catch (err) {
            console.log(err)
        }
    } else {
        console.log('User already created')
    }
}

module.exports = createFirstUser