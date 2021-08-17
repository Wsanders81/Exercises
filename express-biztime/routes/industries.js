const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res, next) => {
    try {
       
        const results = await db.query(`
        SELECT i.code, i.industry, c.code AS company
        FROM industries AS i
        LEFT JOIN company_industries AS ci
        ON i.code = ci.industry_code
        LEFT JOIN companies AS c
        ON c.code = ci.comp_code`)
        return res.send({industries: results.rows})
    } catch(e) {
        return next(e) 
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const {code, industry} = req.body
        const results = await db.query(`INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *`, [code, industry])
        if(results.rows.length === 0) {
            throw new ExpressError(`Unable to add industry, Please enter valid code and industry`, 404)
        }
        return res.send({industry: results.rows[0]})
    } catch(e) {
        return next(e)
    }
})

router.post('/:code', async (req, res, next) => {
    try {
        const {code} = req.params
        const {industry_code} = req.body
        const results = await db.query(`INSERT INTO company_industries (comp_code, industry_code)
                                        VALUES ($1, $2) RETURNING *`, [code, industry_code])
        return res.send(results.rows[0])
    } catch(e) {
        return next(e)
    }
})

module.exports = router