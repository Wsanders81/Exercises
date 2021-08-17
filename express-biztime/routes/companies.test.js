process.env.NODE_ENV = "test";

const request = require('supertest')
const {createData} = require('../_test-common')
const app = require('../app')
const db = require('../db')

beforeEach(createData);

afterAll(async () => {
    // await db.query(`DELETE FROM companies WHERE code = 'mcdonalds'`)
    // await db.query(`UPDATE companies SET name='Apple Computer', description='Maker of OSX.'  WHERE code='apple'`)
    // await db.query("INSERT INTO companies (code, name, description) VALUES ('apple', 'Apple Computer', 'Maker of OSX.')")
    await db.end()
})

describe('/GET', () => {
    test("Retrieve list of all companies", async () => {
        const response = await request(app).get('/companies')
        expect(response.body).toEqual({
            "companies": [
              {
                "code": "ibm",
                "name": "IBM",
                "description": "Big blue."
              },
              {
                "code": "deloitte",
                "name": "Deloitte",
                "description": "Number one in accounting revenue"
              },
              {
                "code": "mcdonalds",
                "name": "McDonalds",
                "description": "Junk food"
              },
              {
                "code": "apple",
                "name": "orange",
                "description": "put"
              }
            ]
          })
    })
})

describe('/GET/apple', ()=> {
    test("Retrieve company details using specific code", async () => {
        const response = await request(app).get('/companies/apple')
        expect(response.body).toEqual({
            "company": {
              "code": "apple",
              "name": "orange",
              "description": "put",
              "industries": [
                "Computers"
              ]
            }
          })
    })
    test("Return 404 if company does not exist", async () => {
        const response = await request(app).get('/companies/asdf')
        expect(response.status).toEqual(404)
    })
})

describe('/POST', ()=> {
    test('Should add new company to DB', async () => {
        const response = await request(app).post('/companies').send({name: 'McDonalds', description: 'Junk food'})
        expect(response.body).toEqual({
            "code": "mcdonalds",
            "name": "McDonalds",
            "description": "Junk food"
          })
    })
    test('Should return error if entering dupe code', async () => {
        const response = await request(app).post('/companies').send({name:"apple", description:"apple"})
        expect(response.status).toEqual(500)
    })
})

describe('/PUT/:code', ()=> {
    // For some reason updating 'apple' afterAll does not return deep equality? Otherwise, this works
    test('Update company details', async () => {
        const response = await request(app).put('/companies/apple').send({name: "orange", description: "put"})
        expect(response.body).toEqual({
            "company": [
              {
                "code": "apple",
                "name": "orange",
                "description": "put"
              }
            ]
          })
    
    })

    test('404 if company does not exist', async () => {
        const response = await request(app).put('/companies/aaaa').send({name: 'test'})
        expect(response.status).toEqual(404)
    })
   
})
describe('/ DELETE', ()=> {
    test('Deletes company from DB', async () => {
        const response = await request(app).delete('/companies/ibm')
        expect(response.body).toEqual({ status : "DELETED"})
    })
})

