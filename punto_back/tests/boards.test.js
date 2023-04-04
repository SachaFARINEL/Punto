const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const Board = require('../models/Board')
const Card = require('../models/Card')

// Connecting to the database before each test.
beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI_TEST);
    await mongoose.connection.dropCollection("boards")
});

// Closing database connection after each test.
afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /boards on empty {collection}", () => {
    it("should return 'No boards found'", async () => {
        const res = await request(app).get("/boards");
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('No boards found');
    });
});

describe("POST /boards", () => {
    it("should create a board", async () => {
        const res = await request(app).post("/boards/create").send({});
        expect(res.statusCode).toBe(201);
    });
});

describe("GET /boards", () => {
    it("should return all boards", async () => {
        const res = await request(app).get("/boards");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /boards/:id", () => {
    it("should return a board with a specific id", async () => {
        const board = await Board.create({});
        const boardID = (board._id).toString()
        const res = await request(app).get("/boards?id=" + boardID);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "_id": boardID,
                "cases": [],
                "__v": 0
            }
        )
    });
});

describe("DELETE /board", () => {
    it("should delete a user", async () => {
        const board = await Board.create({});
        const boardID = (board._id).toString()
        const res = await request(app).delete("/boards").send({
            id: boardID
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            `Board with ID ${boardID} deleted`
        )
    });
});