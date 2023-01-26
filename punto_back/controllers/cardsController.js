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
    if (!req.query.players || req.query.players > 4) {
        return res.status(400).json({message: 'You need at least 2 players and max 4'})
    }

    const cards = await Card.find().lean()
    let decks = {}

    const cardsByColors = cards.reduce((acc, card) => {
        acc[card.color].push(card);
        return acc;
    }, {red: [], blue: [], green: [], yellow: []});

    const redCards = cardsByColors.red
    const blueCards = cardsByColors.blue
    const yellowCards = cardsByColors.yellow
    const greenCards = cardsByColors.green

    switch (req.query.players) {
        case "2":
            decks = {
                "firstDeck": randomize(redCards.concat(blueCards)),
                "secondDeck": randomize(yellowCards.concat(greenCards))
            }
            break
        case "3":
            greenCards.forEach(color => color.neutral = true);

            const firstThird = greenCards.slice(0, greenCards.length / 3);
            const secondThird = greenCards.slice(greenCards.length / 3, 2 * greenCards.length / 3);
            const thirdThird = greenCards.slice(2 * greenCards.length / 3);

            decks = {
                "firstDeck": randomize(redCards.concat(firstThird)),
                "secondDeck": randomize(blueCards.concat(secondThird)),
                "thirdDeck": randomize(yellowCards.concat(thirdThird))
            }
            break
        case "4":
            decks = {
                "firstDeck": randomize(redCards),
                "secondDeck": randomize(blueCards),
                "thirdDeck": randomize(yellowCards),
                "fourthDeck": randomize(greenCards),
            }
            break
    }

    res.json(decks)
})

const randomize = arr => {
    let i, j, tmp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

module.exports = {
    getAllCards,
    shuffleAndDistribute
}