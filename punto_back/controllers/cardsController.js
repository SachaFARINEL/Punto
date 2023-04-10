const Card = require('../models/Card') // Import Card model
const asyncHandler = require('express-async-handler') // Import asyncHandler for handling asynchronous functions in Express routes

// @desc Get all cards
// @route GET /cards
// @access Private
const getAllCards = asyncHandler(async (req, res) => {
    // Get all cards from MongoDB
    const cards = await Card.find().lean()

    // If no cards
    if (!cards?.length) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'No cards found'})
    }

    // Return 200 status code and cards
    res.json(cards)
})

// @desc Get decks
// @route GET /cards/shuffleAndDistribute
// @access Private
const shuffleAndDistribute = asyncHandler(async (req, res) => {
    // If no players or more than 4 players or fewer than 2 players
    if (!req.query.players || req.query.players > 4 || req.query.players < 2) {
        // Return 400 status code and error message
        return res.status(400).json({message: 'You need at least 2 players and max 4'})
    }

    // Get all cards from MongoDB
    const cards = await Card.find().lean()
    let decks = {}

    // The cards are grouped by their colors using reduce method
    const cardsByColors = cards.reduce((acc, card) => {
        acc[card.color].push(card);
        return acc;
    }, {red: [], blue: [], green: [], yellow: []});

// Cards are assigned to individual variables according to their color
    const redCards = cardsByColors.red
    const blueCards = cardsByColors.blue
    const yellowCards = cardsByColors.yellow
    const greenCards = cardsByColors.green

// Switch statement to create decks based on number of players
// Decks are created by combining and shuffling the appropriate cards
    switch (req.query.players) {
        case "2":
            decks = {
                // The cards are shuffled using the randomize function
                "firstDeck": randomize(redCards.concat(blueCards)),
                "secondDeck": randomize(yellowCards.concat(greenCards))
            }
            break
        case "3":
            // The neutral property is added to the green cards
            greenCards.forEach(color => color.neutral = true);

            // The green cards are divided into three equal parts
            // The first part is assigned to the first deck
            const firstThird = greenCards.slice(0, greenCards.length / 3);
            // The second part is assigned to the second deck
            const secondThird = greenCards.slice(greenCards.length / 3, 2 * greenCards.length / 3);
            // The third part is assigned to the third deck
            const thirdThird = greenCards.slice(2 * greenCards.length / 3);

            decks = {
                // The cards are shuffled using the randomize function
                "firstDeck": randomize(redCards.concat(firstThird)),
                "secondDeck": randomize(blueCards.concat(secondThird)),
                "thirdDeck": randomize(yellowCards.concat(thirdThird))
            }
            break
        case "4":
            decks = {
                // The cards are shuffled using the randomize function
                "firstDeck": randomize(redCards),
                "secondDeck": randomize(blueCards),
                "thirdDeck": randomize(yellowCards),
                "fourthDeck": randomize(greenCards),
            }
            break
    }

// The created decks are sent as a response to the client
    res.json(decks)
})

// Function to shuffle the cards
const randomize = arr => {
    // The Fisher-Yates shuffle algorithm is used
    let i, j, tmp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

// Export the functions
module.exports = {
    getAllCards,
    shuffleAndDistribute
}