const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../../app'),
    mongoose = require('mongoose');

chai.use(chaiHttp);

describe('Test the credentials', () => {

    const credentialsData = {
        login: 'vasya',
        password: 'qweasd',
    };

    const wrongCredentialsData = {
        login: 'petya',
        password: 'qwerty',
    };

    describe('Test the user creation and then authentication', () => {
        beforeAll(() => {
            mongoose.connection.dropDatabase();
        });

        describe('Test user creation', () => {
            test('It should response 201 Created status', async () => {
                const response = await chai.request(app)
                    .post('/api/users/register')
                    .send(credentialsData);
                expect(response.status).toBe(201);
            });
        });

        describe('Test user creation with same data', () => {
            test('It should response 409 Conflict status', async () => {
                const response = await chai.request(app)
                    .post('/api/users/register')
                    .send(credentialsData);
                expect(response.status).toBe(409);
            });
        });

        describe('Test user authentication with the same data', () => {
            test("It should response 200 OK status and user's login", async () => {
                const response = await chai.request(app)
                    .post('/api/users/authenticate')
                    .send(credentialsData);
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('login', credentialsData.login);
            });

        });

        describe('Test user authentication with the wrong data', () => {
            test('It should response 401 Not authorized status', async () => {
                const response = await chai.request(app)
                    .post('/api/users/authenticate')
                    .send(wrongCredentialsData);
                expect(response.status).toBe(401);
            });
        });
    });

    describe('Test the user authentication without creation', () => {
        beforeAll(() => {
            mongoose.connection.dropDatabase();
        });

        test('It should response 401 Not authorized status', async () => {
            const response = await chai.request(app)
                .post('/api/users/authenticate')
                .send(credentialsData);
            expect(response.status).toBe(401);
        });
    });
});