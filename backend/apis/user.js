const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

const UserModel = require('../db/user/user.model');
const { use } = require('./pokemon');
const bcrypt = require('bcryptjs');

const userDB = [];

router.get('/', function(request, response) {
    response.send(userDB);
})

router.get('/isLoggedIn', async function(req, res) {

    const username = req.cookies.username;

    if(!username) {
        return res.send({username: null})
    }
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
    } catch(e) {
        return res.send({username: null})
    }
    
    if(!decryptedUsername) {

        return res.send({username: null})
    } else {
        return res.send({username: decryptedUsername})
    }

})

router.post('/logOut', async function(req, res) {

    res.cookie('username', '', {
        maxAge: 0,
    })

    res.send(true);

});

router.get('/:username', async function(req, res) {
    const username = req.params.username;

    const userData = await UserModel.findUserByUsername(username);

    return res.send(userData);
})

module.exports = router