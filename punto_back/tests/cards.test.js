const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const connectDB = require("../config/dbConn");

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
        const res = await request(app).get("/cards");
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(72);
    });
});

