const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const Game = require('../models/Game')
const Board = require('../models/Board')
const Card = require('../models/Card')
const User = require('../models/User')

// Connecting to the database before each test.
beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI_TEST);
    await mongoose.connection.dropCollection("games")
});

// Closing database connection after each test.
afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /games on empty {collection}", () => {
    it("should return 'No games found'", async () => {
        const res = await request(app).get("/games");
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
        const res = await request(app).post("/games").send({
            board: boardID,
            hands:
                [
                    {
                        idPlayer: userID,
                        cards: []
                    }
                ]
        });
        expect(res.statusCode).toBe(201);
    });
});

describe("GET /games", () => {
    it("should return all boards", async () => {
        const res = await request(app).get("/games");
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
        const res = await request(app).get("/games?id=" + gameID);
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
        const res = await request(app).delete("/games").send({
            id: gameID
        });
        expect(res.statusCode).toBe(200);
    });
});