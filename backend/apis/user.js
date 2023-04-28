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
    let userData = await UserModel.findUsers();
    userData = userData.filter(u => {
        if (u.userName.toLowerCase().includes(user)) {
            return true;
        }
        return false;
    });
    return response.send(userData);
})

router.get('/search/:userName', async function(request, response) {
    const user = request.params.userName.toLowerCase();
    let userData = await UserModel.findUsers();
    userData = userData.filter(u => {
        if (u.userName.toLowerCase() === user) {
            return true;
        }
        return false;
    });
    return response.send(userData);
})

router.get('/logout/:userName', async function(req, res) {
    const username = req.params.userName;
    res.cookie('token', '', {maxAge: 0})
    res.send("You are successfully logged out.");
});

router.get('/:username', async function(req, res) {
    
    const username = req.params.username;
    const userData = await UserModel.findUserByUsername(username);
    return res.send(userData);
})

router.put("/:userId", async(request, response) => {
    console.log("in put request");
    const userId = request.params.userId;
    const userBody = request.body;
    const postRes = await UserModel.updateUser(userId, userBody);
    response.send(postRes);
  });

module.exports = router