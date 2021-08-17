// Invoice Routes

const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router()
const db = require('../db')
let ts = Date.now()
let dateObj = new Date(ts)
let date = dateObj.getDate()
let month = dateObj.getMonth()+1
let year = dateObj.getFullYear()


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
        let todaysDate = (year+ "-" + month + "-" + date) 
        const {id} = req.params
        const {amt, paid} = req.body
        const invoice = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id])
        if(invoice.rows.length === 0) {
            throw new ExpressError(`Invoice with id of ${id} not found`, 404)
        }
        const amount = invoice.rows[0]["amt"]
        const paidBool = invoice.rows[0]["paid"]
        if(paidBool === true && paid === false) {
            const results = await db.query(`UPDATE invoices SET paid = $1, paid_date= $2, amt = $4 
            WHERE id = $3 RETURNING *`, [paid, null, id, amt])
            return res.json({invoice: results.rows[0]})
        } else if (paidBool === false && paid === true){
        const results = await db.query(`UPDATE invoices SET paid = $1, paid_date= $2, amt = $3 
        WHERE id = $4 RETURNING *`, [paid, todaysDate, amt, id])
        return res.json({invoice: results.rows[0]}) 
        } else {
            const results = await db.query(`UPDATE invoices SET paid = $1, amt =$2 WHERE id = $3 RETURNING *`)
            return res.json({invoice: results.rows[0]}) 

        }
        
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