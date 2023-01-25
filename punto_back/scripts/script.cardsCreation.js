const Card = require('../models/Card')

const scriptCardsCreation = async () => {
    try {
        Card.countDocuments({}, function (err, count) {
            if (count === 0) {
                console.log('Cards creation')
                const colors = ['red', 'blue', 'yellow', 'green'];
                for (let i = 1; i <= 2; i++) {
                    for (const color of colors) {
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