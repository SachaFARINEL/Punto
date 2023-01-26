const Card = require('../models/Card')
const asyncHandler = require('express-async-handler')

// @desc Get all cards
// @route GET /cards
// @access Private
const getAllCards = asyncHandler(async (req, res) => {
    // Get all cards from MongoDB
    const cards = await Card.find().lean()

    // If no cards
    if (!cards?.length) {
        return res.status(400).json({message: 'No cards found'})
    }

    res.json(cards)
})

const shuffleAndDistribute = asyncHandler(async (req, res) => {
    const playersNumber = req.query.players
    const cards = await Card.find().lean()
    let decks = {}

    const cardsByColors = cards.reduce((acc, card) => {
        acc[card.color].push(card);
        return acc;
    }, {red: [], blue: [], green: [], yellow: []});

    const randomize = (tab) => {
        var i, j, tmp;
        for (i = tab.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = tab[i];
            tab[i] = tab[j];
            tab[j] = tmp;
        }
        return tab;
    }

    switch (playersNumber) {
        case "2":
            const firstHand = cardsByColors.red.concat(cardsByColors.blue)
            const secondHand = cardsByColors.yellow.concat(cardsByColors.green)
            decks = {
                "firstDeck": randomize(firstHand),
                "secondDeck": randomize(secondHand)
            }
            break
        case "3":
            decks = {
                "firstDeck": cardsByColors.red,
                "secondDeck": cardsByColors.yellow,
                "thirdDeck": cardsByColors.blue
            }

            for (key in decks) {
                decks[key].concat(cardsByColors.green.slice(6))
                randomize(decks[key])
            }
            break
        case "4":
            decks = {
                "firstDeck": randomize(cardsByColors.red),
                "secondDeck": randomize(cardsByColors.blue),
                "thirdDeck": randomize(cardsByColors.yellow),
                "fourthDeck": randomize(cardsByColors.green),
            }
        default:
            console.log('Sorry, you need to be at least 2 and max 4');
    }

    res.json(decks)


})

module.exports = {
    getAllCards,
    shuffleAndDistribute
}