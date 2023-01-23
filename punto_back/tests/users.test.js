const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const User = require('../models/User')
const connectDB = require("../config/dbConn");

// Connecting to the database before each test.
beforeAll(async () => {
    connectDB(process.env.DATABASE_URI_TEST);
    await mongoose.connection.dropCollection("users")
});

// Closing database connection after each test.
afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /users on empty {collection}", () => {
    it("should return 'No users found'", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('No users found');
    });
});

describe("POST /users without all fields", () => {
    it("should return 400 'All fields are required'", async () => {
        const res = await request(app).post("/users").send({
            email: "farinel.sacha@gmail.com",
            username: "SachaFARINEL",
            password: "test",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("All fields are required");

    });
});

describe("POST /users", () => {
    it("should create a user", async () => {
        const res = await request(app).post("/users").send({
            email: "farinel.sacha@gmail.com",
            username: "SachaFARINEL",
            password: "test",
            birthday: "27/10/1994"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("New user farinel.sacha@gmail.com created");

    });
});

describe("POST duplicate /users", () => {
    it("should return 'Duplicate username' error", async () => {
        const res = await request(app).post("/users").send({
            email: "farinel.sacha@gmail.com",
            username: "SachaFARINEL",
            password: "test",
            birthday: "27/10/1994"
        });
        expect(res.statusCode).toBe(409);
        expect(res.body.message).toBe("Duplicate username");

    });
});

describe("GET /users", () => {
    it("should return all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe("DELETE /user", () => {
    it("should delete a user", async () => {
        const user = await User.findOne({email: 'farinel.sacha@gmail.com'}).lean().exec()
        const res = await request(app).delete("/users").send({
            id: user._id.toString()
        });
        expect(res.statusCode).toBe(200);
    });
});