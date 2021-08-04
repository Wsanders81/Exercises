const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
//** If using fake DB */
const db = require('../fakeDb')



module.exports = router