process.env.NODE_ENV = "test"

const request = require('supertest')

const app = require('../app')
const db = require('../db')

let book_isbn; 

beforeEach(async () => {
    let result = await db.query(`
    INSERT INTO books
    (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES (
        '123456789', 
        'http://a.co/eobPtX2', 
        'english',
        'Matthew Lane', 
        264, 
        'Princeton University Press',
        'Power-Up: Unlocking the Hidden Mathematics in Video Games',
        2017)
        RETURNING isbn`)
    book_isbn = result.rows[0].isbn
})

describe("GET /books",   ()=> {
    test("Retrieves a list of books", async function () {
      const res = await request(app).get(`/books`);
      const books = res.body.books;
      expect(books).toHaveLength(1);
      expect(books[0]).toHaveProperty("isbn");
     
    });
  });
describe("GET /books/:isbn", ()=>{
    test("Retrieve details about specified book", async () => {
        const res = await request(app).get(`/books/123456789`)
        const book = res.body.book
        expect(res.status).toEqual(200)
        expect(book).toHaveProperty('isbn')
    })
})
describe("POST /books", ()=> {
    test("Creates new book and enters in DB", async () => {
        const res = await request(app).post('/books').send(            
            {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Mattdddddhew Laneeeee",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
        )
        const book = res.body.book
        expect(res.status).toBe(201)
        expect(book).toHaveProperty('isbn')
    })
})
describe("PUT /books/:isbn", ()=> {
    test("Updates book with specified isbn", async () => {
        const res = await request(app).put(`/books/${book_isbn}`).send(
            {   "isbn": "123456789",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Mattdddddhew Laneeeee",
                "language": "spanish",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
        )
        const book = res.body.book
        expect(res.status).toBe(200)
        expect(book.language).toEqual("spanish")
    })
})
describe("DELETE /books/:isbn", ()=> {
    test("Deletes specified book", async () => {
        const res = await request(app).delete('/books/123456789')
        expect(res.status).toBe(200)
        expect(res.body).toEqual({message: "Book deleted"})
    })
})





afterEach(async function()  {
    await db.query(`DELETE FROM books`)
})

afterAll(async function()  {
    await db.end()
})