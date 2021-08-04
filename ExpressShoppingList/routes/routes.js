const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
//** If using fake DB */
const items = require('../fakeDb')

router.get("/", (req, res, next)=>{
    return res.json({items})
})

router.get('/:name', (req, res, next)=> {
    item = items.find( i => i.name === req.params.name)
    return res.json(item)
})

router.post('/', (req, res, next)=>  {
    const newItem = {name:req.body.name, price:req.body.price}
    console.log(newItem)
    items.push(newItem)
    return res.status(201).json({added: newItem})
} )

router.patch('/:name', (req, res, next) => {
    item = items.find( i => i.name === req.params.name)
    item.name = req.body.name
    item.price = req.body.price
    return res.json({updated: item})
})

router.delete('/:name', (req, res, next) => {
    item = items.find( i => i.name === req.params.name)
    items.splice(item, 1)
    return res.json({message: "Deleted"})
})

module.exports = router

