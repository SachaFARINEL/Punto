const Card = require('../models/Card')

// A script to create a set of cards if they don't exist in the database
const scriptCardsCreation = async () => {
    try {
        // Check the number of documents in the Card collection
        Card.countDocuments({}, function (err, count) {
            // If there are no documents, create the cards
            if (count === 0) {
                console.log('Cards creation')
                const colors = ['red', 'blue', 'yellow', 'green'];
                for (let i = 1; i <= 2; i++) {
                    // Create two sets of cards
                    for (const color of colors) {
                        // Create cards for each color
                        for (let j = 1; j <= 9; j++) {
                            const cardObject = {color, number: j}
                            Card.create(cardObject)
                        }
                    }
                }
            } else {
                console.log('Cards already created')
            }
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = scriptCardsCreation
