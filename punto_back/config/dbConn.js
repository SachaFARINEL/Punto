const mongoose = require('mongoose')

const connectDB = async (database) => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(database,
            {useNewUrlParser: true, useUnifiedTopology: true})
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB