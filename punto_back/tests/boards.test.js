const mongoose = require("mongoose"); // Importing the mongoose library.
const request = require("supertest"); // Importing supertest to test the API.
const app = require('../server') // Importing the app.
const Board = require('../models/Board') // Importing the Board model.
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken to create a fake refreshToken.

// Creating a fake refreshToken.
const jwtToken = jwt.sign(
    {
        "UserInfo": {
            "email": 'farinel.sacha@gmail.com'
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '15m'}
)

// Connecting to the database before all test.
beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URI_TEST);
    if (mongoose.connection.collections.boards) {
        await mongoose.connection.dropCollection("boards");
    }
});

// Closing database connection after all test.
afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /boards on empty {collection}", () => {
    it("should return 'No boards found'", async () => {
        const res = await request(app)
            .get("/boards")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('No boards found');
    });
});

describe("POST /boards", () => {
    it("should create a board", async () => {
        const res = await request(app)
            .post("/boards/create")
            .send({})
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(201);
    });
});

describe("GET /boards", () => {
    it("should return all boards", async () => {
        const res = await request(app)
            .get("/boards")
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("GET /boards/:id", () => {
    it("should return a board with a specific id", async () => {
        const board = await Board.create({});
        const boardID = (board._id).toString()
        const res = await request(app)
            .get("/boards?id=" + boardID)
            .set('Authorization', `Bearer ${jwtToken}`);
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
        const res = await request(app)
            .delete("/boards")
            .send({id: boardID})
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            `Board with ID ${boardID} deleted`
        )
    });
});