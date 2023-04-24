const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

const UserModel = require('../db/user/user.model');
const { use } = require('./pokemon');
const bcrypt = require('bcryptjs');

const userDB = [];

router.get('/', async function(request, response) {
    const userData = await UserModel.findUsers();
    response.send(userData);
})

router.get('/:userName', async function(request, response) {
    const user = request.params.userName.toLowerCase();
    console.log("in search api")
    let userData = await UserModel.findUsers();
    console.log(userData);
    userData = userData.filter(u => {
        if (u.userName.toLowerCase().includes(user)) {
            return true;
        }
        return false;
    });
    return response.send(userData);
})

router.get('/isLoggedIn', async function(req, res) {
    const username = req.cookies.username;
    if(!username) {return res.send({username: null})}
    let decryptedUsername;
    try {
        decryptedUsername = jwt.verify(username, "HUNTERS_PASSWORD")
    } catch(e) {
        return res.send({username: null})
    }
    
    if(!decryptedUsername) {return res.send({username: null});} 
    else {return res.send({username: decryptedUsername})}
})

router.post('/logout', async function(req, res) {
    res.cookie('userName', '', {maxAge: 0,})
    res.cookie('token', '', {maxAge: 0,})
    res.send(true);
});

router.get('/:username', async function(req, res) {
    
    const username = req.params.username;
    const userData = await UserModel.findUserByUsername(username);
    return res.send(userData);
})

module.exports = router