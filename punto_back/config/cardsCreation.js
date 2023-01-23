const Card = require('../models/Card')

const cardsCreation = async () => {
    try {
        Card.countDocuments({}, function (err, count) {
            if (count === 0) {
                console.log('Cards creation')
                const colors = ['#e2100a', '#00b4e7', '#feb008', '#6dba0f'];
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

module.exports = cardsCreation