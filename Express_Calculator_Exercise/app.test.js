const app = require('./app')
const request = require('supertest')
process.env.NODE_ENV = "test";
describe("GET /mean", function() {
    test("Get Mean of Array of Nums", async function(){
        const resp = await request(app).get('/mean')
        expect(resp.statusCode).toBe(200)
    })
})


