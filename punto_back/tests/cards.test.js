const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const connectDB = require("../config/dbConn");
const jwt = require("jsonwebtoken");
const Card = require('../models/Card')

const jwtToken = jwt.sign(
    {
        "UserInfo": {
            "email": 'farinel.sacha@gmail.com'
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '15m'}
)

// Connecting to the database before each test.
beforeAll(async () => {
    connectDB(process.env.DATABASE_URI);
});

// Closing database connection after each test.
afterAll(async () => {
    await mongoose.connection.close();
});


describe("GET /cards", () => {
    it("should return all cards", async () => {
        const res = await request(app)
            .get("/cards")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(72);
    });
});

describe("GET /cards/shuffleAndDistribute", () => {
    it("should return a 400 error if less than 2 or more than 4 players are specified", async () => {
        const res = await request(app)
            .get("/cards/shuffleAndDistribute?players=1")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("You need at least 2 players and max 4");

        const res2 = await request(app)
            .get("/cards/shuffleAndDistribute?players=5")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res2.statusCode).toBe(400);
        expect(res2.body.message).toBe("You need at least 2 players and max 4");
    });

    it("should return shuffled decks for 2 players", async () => {
        // Make the request to the API
        const res = await request(app)
            .get("/cards/shuffleAndDistribute?players=2")
            .set('Authorization', `Bearer ${jwtToken}`);

        // Assert that the response is correct
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            firstDeck: expect.any(Array),
            secondDeck: expect.any(Array),
        });

        const cardsInDecks = [...res.body.firstDeck, ...res.body.secondDeck,];
        expect(cardsInDecks.length).toBe(72);
    });

    it("should return shuffled decks for 3 players", async () => {
        // Make the request to the API
        const res = await request(app)
            .get("/cards/shuffleAndDistribute?players=3")
            .set('Authorization', `Bearer ${jwtToken}`);

        // Assert that the response is correct
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            firstDeck: expect.any(Array),
            secondDeck: expect.any(Array),
            thirdDeck: expect.any(Array)
        });

        const cardsInDecks = [...res.body.firstDeck, ...res.body.secondDeck, ...res.body.thirdDeck];
        expect(cardsInDecks.length).toBe(72);
    });

    it("should return shuffled decks for 4 players", async () => {
        // Make the request to the API
        const res = await request(app)
            .get("/cards/shuffleAndDistribute?players=4")
            .set('Authorization', `Bearer ${jwtToken}`);

        // Assert that the response is correct
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            firstDeck: expect.any(Array),
            secondDeck: expect.any(Array),
            thirdDeck: expect.any(Array),
            fourthDeck: expect.any(Array)
        });

        const cardsInDecks = [...res.body.firstDeck, ...res.body.secondDeck, ...res.body.thirdDeck, ...res.body.fourthDeck];
        expect(cardsInDecks.length).toBe(72);
    });
});

