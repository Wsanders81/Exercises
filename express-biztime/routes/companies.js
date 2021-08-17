// Companies Routes 

const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const slugify = require('slugify')
const db = require('../db')

router.get('/', async (req, res, next) => {
    try{
        
    const results = await db.query(`SELECT * FROM companies`)
    return res.json({companies: results.rows})
    } catch(e) {
        return next(e) 
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const code = req.params.code
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code])
        if(results.rows.length === 0) {
            throw new ExpressError(`Company with code of "${code}" not found`, 404)
        }
        const industryResults = await db.query(`
        SELECT c.code, c.name, c.description, i.industry
        FROM companies AS c
        LEFT JOIN company_industries AS ci
        ON c.code = ci.comp_code
        LEFT JOIN industries as i
        ON ci.industry_code = i.code
        WHERE c.code = $1`, [code])
        industries = industryResults.rows.map( i => i.industry)
        results.rows[0].industries = industries
        
        return res.json({
            company: results.rows[0]
        })
        
    } catch(e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, description } = req.body
        const code = slugify(name, {lower: true})
        const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description])
        return res.status(201).json(results.rows[0])
    } catch(e) {
        return next(e)
    }
} ) 



router.put('/:code', async (req, res, next) => {
    try {
        const code = req.params.code
        const { name, description } = req.body
        const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`,[name, description, code])
        if(results.rows.length === 0) {
            throw new ExpressError(`Company with code of ${code} not found`, 404)
        } 
        return res.json({company: results.rows})
    } catch(e) {
        return next(e)  
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const {code} = req.params
        const results = await db.query(`DELETE FROM companies WHERE code = $1`, [code])
        if(results.rows.length === 0) {
            throw new ExpressError(`Company with code of "${code}" not found`, 404)
        }
        return res.send({ status : "DELETED"})
    } catch(e) {
        return next(e)
    }
})

module.exports = router