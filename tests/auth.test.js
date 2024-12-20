const request = require('supertest')
const { connect } = require('./database')
const UserModel = require('../models/user.model')
const app = require('../app'); // app instance

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/auth/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'tobi', 
            password: 'Password123', 
            email: 'tobi@mail.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body.data).toHaveProperty('user')
        expect(response.body.data.user).toHaveProperty('username', 'tobi')
        expect(response.body.data.user).toHaveProperty('email', 'tobi@mail.com')        
    })


    // it('should login a user', async () => {
    //     // create user in out db
    //     const user = await UserModel.create({ username: 'tobi', password: '123456'});

    //     // login user
    //     const response = await request(app)
    //     .post('/login')
    //     .set('content-type', 'application/json')
    //     .send({ 
    //         username: 'tobi', 
    //         password: '123456'
    //     });
    

    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('token')      
    // })
})