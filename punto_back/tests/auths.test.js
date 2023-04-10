const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../server')
const jwt = require("jsonwebtoken");
const connectDB = require("../config/dbConn");

// Connecting to the database before all test.
beforeAll(async () => {
    connectDB(process.env.DATABASE_URI);
});

// Closing database connection after all test.
afterAll(async () => {
    await mongoose.connection.close();
});

const refreshToken = jwt.sign(
    {"email": 'farinel.sacha@gmail.com'},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '7d'}
)

describe('auth controller', () => {
    describe('POST /auth', () => {
        it('should return 400 if email or password is missing', async () => {
            const response = await request(app)
                .post('/auth')
                .send({email: 'test@test.com'})

            expect(response.status).toBe(400)
            expect(response.body.message).toBe('All fields are required')
        })

        it('should return 401 if user is not found or not active', async () => {
            const response = await request(app)
                .post('/auth')
                .send({email: 'unknown@test.com', password: 'password'})

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })


        it('should return 401 if password is incorrect', async () => {
            const response = await request(app)
                .post('/auth')
                .send({email: 'farinel.sacha@gmail.com', password: 'wrongpassword'})

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        it('should return 200 with accessToken if email and password are correct', async () => {
            const response = await request(app)
                .post('/auth')
                .send({email: 'farinel.sacha@gmail.com', password: 'test'})

            expect(response.status).toBe(200)
            expect(response.body.accessToken).toBeDefined()
        })
    })

    describe('GET /auth/refresh', () => {
        it('should return 401 if refreshToken is missing', async () => {
            const response = await request(app)
                .get('/auth/refresh')

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        it('should return 403 if refreshToken is invalid', async () => {
            const response = await request(app)
                .get('/auth/refresh')
                .set('Cookie', ['jwt=invalidtoken'])

            expect(response.status).toBe(403)
            expect(response.body.message).toBe('Forbidden')
        })

        it('should return 401 if user is not found for the refreshToken', async () => {
            const fakeRefreshToken = jwt.sign(
                {"email": 'fakeMail@gmail.com'},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '7d'}
            )
            const response = await request(app)
                .get('/auth/refresh')
                .set('Cookie', [`jwt=${fakeRefreshToken}`])

            expect(response.status).toBe(401)
            expect(response.body.message).toBe('Unauthorized')
        })

        it('should return 200 with new accessToken if refreshToken is valid and user is found', async () => {

            const response = await request(app)
                .get('/auth/refresh')
                .set('Cookie', [`jwt=${refreshToken}`])

            expect(response.status).toBe(200)
            expect(response.body.accessToken).toBeDefined()
        })
    })

    describe('POST /auth/logout', () => {
        it('should return 204 if cookie is not set', async () => {
            const response = await request(app)
                .post('/auth/logout')

            expect(response.status).toBe(204)
        })

        it('should clear cookie and return 200 if cookie exists', async () => {
            const response = await request(app)
                .post('/auth/logout')
                .set('Cookie', [`jwt=${refreshToken}`])

            expect(response.status).toBe(200)
        })

    })
})