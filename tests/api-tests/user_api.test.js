const chai = require('chai'),
    chaiHttp = require('chai-http'),
    app = require('../../app');

chai.use(chaiHttp);

describe('Test the user creation', () => {
    test('It should return 200 OK status', async () => {
        chai.request(app)
            .post('/api/users/authenticate')
            .type('form')
            .send({
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            })
    });
});

describe('Test the user authentication', () => {
    test('It should return 200 OK status', async () => {
        chai.request(app)
            .post('/api/users/authenticate')
            .type('form')
            .send({
                '_method': 'put',
                'password': '123',
                'confirmPassword': '123'
            })
    });
});