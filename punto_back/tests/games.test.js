const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const Game = require('../models/Game')
const Board = require('../models/Board')
const User = require('../models/User')
const jwt = require("jsonwebtoken");

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
    await mongoose.connect(process.env.DATABASE_URI_TEST);
    if (mongoose.connection.collections.games) {
        await mongoose.connection.dropCollection("games");
    }
});

// Closing database connection after each test.
afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /games on empty {collection}", () => {
    it("should return 'No games found'", async () => {
        const res = await request(app)
            .get("/games")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('No games found');
    });
});

describe("POST /games", () => {
    it("should create a game", async () => {
        const board = await Board.create({});
        const boardID = (board._id).toString()
        const user = await User.create({
            email: "farinel.sacha@gmail.com",
            username: "SachaFARINEL",
            password: "test",
            birthday: "27/10/1994"
        });
        const userID = (user._id).toString()
        const res = await request(app)
            .post("/games")
            .send({
                board: boardID,
                hands:
                    [
                        {
                            idPlayer: userID,
                            cards: []
                        }
                    ]
            })
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(201);
    });
});

describe("GET /games", () => {
    it("should return all boards", async () => {
        const res = await request(app)
            .get("/games")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /games/:id", () => {
    it("should return a game with a specific id", async () => {
        const board = await Board.create({});
        const boardID = (board._id).toString()
        const user = await User.create({
            email: "farinel.sacha@gmail.com",
            username: "SachaFARINEL",
            password: "test",
            birthday: "27/10/1994"
        });
        const userID = (user._id).toString()
        const game = await Game.create({
            board: boardID,
            hands:
                [
                    {
                        idPlayer: userID,
                        cards: []
                    }
                ]
        })
        const gameID = ((game._id).toString())
        const res = await request(app)
            .get("/games?id=" + gameID)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /games", () => {
    it("should delete a game", async () => {
        const board = await Board.create({});
        const boardID = (board._id).toString()
        const user = await User.create({
            email: "farinel.sacha@gmail.com",
            username: "SachaFARINEL",
            password: "test",
            birthday: "27/10/1994"
        });
        const userID = (user._id).toString()
        const game = await Game.create({
            board: boardID,
            hands:
                [
                    {
                        idPlayer: userID,
                        cards: []
                    }
                ]
        })
        const gameID = ((game._id).toString())
        const res = await request(app)
            .delete("/games")
            .send({id: gameID})
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
    });
});