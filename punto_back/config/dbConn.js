// Import the Mongoose library
const mongoose = require('mongoose')

// Define an async function for connecting to a MongoDB database
const connectDB = async (database) => {
    try {
        // Disable strict mode for queries to allow for more flexible data modeling
        mongoose.set('strictQuery', false)
        // Connect to the MongoDB database using the provided URL and options
        await mongoose.connect(database,
            {useNewUrlParser: true, useUnifiedTopology: true})
    } catch (err) {
        // Log any errors that occur during the connection process
        console.log(err)
    }
}

// Export the connectDB function for use in other modules
module.exports = connectDB
