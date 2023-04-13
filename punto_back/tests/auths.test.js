const mongoose = require("mongoose"); // Importing mongoose to connect to the database.
const request = require("supertest"); // Importing supertest to test the API.
const app = require('../server') // Importing the app.
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken to create a fake refreshToken.
const connectDB = require("../config/dbConn"); // Importing the database connection function.

// Connecting to the database before all test.
beforeAll(async () => {
    connectDB(process.env.DATABASE_URI);
});

// Closing database connection after all test.
afterAll(async () => {
    await mongoose.connection.close();
});

// Creating a fake refreshToken.
const refreshToken = jwt.sign(
    {"email": 'farinel.sacha@gmail.com'},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '7d'}
)

// Testing the auth controller.
describe('auth controller', () => {
    // Testing the POST /auth route.
    describe('POST /auth', () => {
        // Testing the response if email or password is missing.
        it('should return 400 if email or password is missing', async () => {
            // Sending a request to the route with missing password.
            const response = await request(app)
                .post('/auth')
                .send({email: 'test@test.com'})

            // Testing the response status.
            expect(response.status).toBe(400)
            // Testing the response body.
            expect(response.body.message).toBe('All fields are required')
        })

        // Testing the response if user is not found or not active.
        it('should return 401 if user is not found or not active', async () => {
            // Sending a request to the route with an unknown email.
            const response = await request(app)
                .post('/auth')
                .send({email: 'unknown@test.com', password: 'password'})

            // Testing the response status.
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        // Testing the response if password is incorrect.
        it('should return 401 if password is incorrect', async () => {
            // Sending a request to the route with an incorrect password.
            const response = await request(app)
                .post('/auth')
                .send({email: 'farinel.sacha@gmail.com', password: 'wrongpassword'})

            // Testing the response status.
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        // Testing the response if email and password are correct.
        it('should return 200 with accessToken if email and password are correct', async () => {
            // Sending a request to the route with correct email and password.
            const response = await request(app)
                .post('/auth')
                .send({email: 'farinel.sacha@gmail.com', password: 'test'})

            // Testing the response status.
            expect(response.status).toBe(200)
            expect(response.body.accessToken).toBeDefined()
        })
    })

    // Testing the GET /auth/refresh route.
    describe('GET /auth/refresh', () => {
        // Testing the response if refreshToken is missing.
        it('should return 401 if refreshToken is missing', async () => {
            // Sending a request to the route without the refreshToken.
            const response = await request(app)
                .get('/auth/refresh')

            // Testing the response status.
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        // Testing the response if refreshToken is invalid.
        it('should return 403 if refreshToken is invalid', async () => {
            // Sending a request to the route with an invalid refreshToken.
            const response = await request(app)
                .get('/auth/refresh')
                .set('Cookie', ['jwt=invalidtoken'])

            // Testing the response status.
            expect(response.status).toBe(403)
            expect(response.body.message).toBe('Forbidden')
        })

        // Testing the response if refreshToken is valid but user is not found.
        it('should return 401 if user is not found for the refreshToken', async () => {
            // Creating a fake refreshToken.
            const fakeRefreshToken = jwt.sign(
                {"email": 'fakeMail@gmail.com'},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '7d'}
            )
            // Sending a request to the route with a valid refreshToken but unknown user.
            const response = await request(app)
                .get('/auth/refresh')
                .set('Cookie', [`jwt=${fakeRefreshToken}`])

            // Testing the response status.
            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        // Testing the response if refreshToken is valid and user is found.
        it('should return 200 with new accessToken if refreshToken is valid and user is found', async () => {
            // Sending a request to the route with a valid refreshToken.
            const response = await request(app)
                .get('/auth/refresh')
                .set('Cookie', [`jwt=${refreshToken}`])

            // Testing the response status.
            expect(response.status).toBe(200)
            expect(response.body.accessToken).toBeDefined()
        })
    })

    // Testing the POST /auth/logout route.
    describe('POST /auth/logout', () => {
        // Testing the response if cookie is not set.
        it('should return 204 if cookie is not set', async () => {
            // Sending a request to the route without the refreshToken.
            const response = await request(app)
                .post('/auth/logout')

            // Testing the response status.
            expect(response.status).toBe(204)
        })

        // Testing the response if cookie is set.
        it('should clear cookie and return 200 if cookie exists', async () => {
            // Sending a request to the route with the refreshToken.
            const response = await request(app)
                .post('/auth/logout')
                .set('Cookie', [`jwt=${refreshToken}`])

            // Testing the response status.
            expect(response.status).toBe(200)
        })
    })
})