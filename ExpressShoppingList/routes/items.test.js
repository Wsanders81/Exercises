const app = require('../app')
const request = require('supertest')
process.env.NODE_ENV= "test"
let items = require('../fakeDb')

let snickers = {name: "Snickers", 
                price: 1.50}

beforeEach(function(){

    items.push(snickers)
})

afterEach(function(){
    items.length = 0
})

describe("GET /items", ()=> {
    test("Get all items", async()=> {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: [snickers]})
    } )
})

describe("GET /items/:name", ()=>{
    test("Get specific item", async()=> {
        const res = await request(app).get(`/items/${snickers.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(snickers)
    })
})

describe("POST /items", ()=> {
    test("Post item and price to DB", async()=> {
        const res = await request(app).post('/items').send({name: "Whoppers", price: 2.00})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added: {name: "Whoppers", price: 2.00}})
    })
})

describe("PATCH /items/:name", ()=> {
    test("Patching specific item", async()=> {
        const res = await request(app).patch(`/items/${snickers.name}`).send({name: "Whoppers", price: 2.00})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated: {name: "Whoppers", price: 2.00}})
    })
})

describe("DELETE /items/:name", ()=> {
    test("Deleting item", async()=>{
        const res = await request(app).delete(`/items/${snickers.name}`)
        expect(res.statusCode).toBe(200)
        console.log(res.body)
        expect(res.body).toEqual({message: "Deleted"})
    })
})
    