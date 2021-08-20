const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const {SECRET_KEY} = require('../config')
const jwt = require('jsonwebtoken')
const User  = require('../models/user')

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if(!username || !password) {
            throw new ExpressError("Username and password required", 404)
        }
        const result = await User.authenticate(username, password)  
        if (result === true){
            let token = jwt.sign({username: username}, SECRET_KEY)
            //TODO update timestamp
            return res.json({token})
        } else throw new ExpressError("Invalid username/password", 400)
    } catch(e) {
        return next(e)
    }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async (req, res, next) => {
    try {
        const {username, password, first_name, last_name, phone} = req.body
        const result = await User.register(username, password, first_name, last_name, phone)
        let token =  jwt.sign({username:username}, SECRET_KEY)
        //TODO update login time 
        return res.json({token})
    } catch(e) { 
        return next(e)
    }
})

module.exports = router