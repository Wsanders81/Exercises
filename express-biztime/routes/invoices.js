// Invoice Routes

const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const db = require('../db')


router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM invoices`)
        return res.json({invoices: results.rows})
    } catch(e) {
        return next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const results = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id])
        if(results.rows.length === 0) {
            throw new ExpressError(`Invoice with id of ${id} not found`, 404)
        }
        return res.json({invoice: results.rows[0]})
    } catch(e) {
        return next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const {amt} = req.body
        const results = await db.query(`UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING *`, [amt, id])
        if(results.rows.length === 0) {
            throw new ExpressError(`Invoice with id of ${id} not found`, 404)
        }
        return res.json({invoice: results.rows[0]})
    } catch(e) {
        return next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const results = await db.query(`DELETE FROM invoices WHERE id = $1`, [id])
        if(results.rows.length === 0) {
            throw new ExpressError(`Invoice with id of ${id} not found`, 404)
        }
        return res.json({ status: "DELETED"})
    } catch(e) {
        return next(e)
    }
})

module.exports = router