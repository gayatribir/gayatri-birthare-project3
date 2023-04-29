const express = require('express')
const router = express.Router();
const UserModel = require('../db/user/user.model');
const auth = require('../middleware/auth')

router.get('/', async function(request, response) {
    try{
        const userData = await UserModel.findUsers();
        return response.send(userData);
    }catch(e){
        return res.send("Error occurred in findUsers ", e);
    }
    
})

router.get('/:userName', async function(request, response) {
    const user = request.params.userName.toLowerCase();
    let userData = await UserModel.findUsers();
    try{
        userData = userData.filter(u => {
            if (u.userName.toLowerCase().includes(user)) {
                return true;
            }
            return false;
        });
        return response.send(userData);
    }catch(e){
        return res.send("Error occurred in findUsers get by userName", e);
    }
    
})

router.get('/search/:userName', async function(request, response) {
    const user = request.params.userName.toLowerCase();
    try{
        let userData = await UserModel.findUsers();
        userData = userData.filter(u => {
            if (u.userName.toLowerCase().includes(user)) {
                return true;
            }
            return false;
        });
        return response.send(userData);
    }catch(e){
        return res.send("Error occurred in findUsers get by userName", e);
    }
    
})

router.get('/logout/:userName', async function(request, response) {
    if(auth.verifyToken(request, response)) {
        const username = request.params.userName;
        response.cookie('token', '', {maxAge: 0})
        response.send("You are successfully logged out.");
    }
    else{
        return response.status(401).send("Invalid Token");
    }
});

router.get('/:username', async function(req, res) {
    const username = req.params.username;
    const userData = await UserModel.findUserByUsername(username);
    return res.send(userData);
})

router.put("/:userId", async(request, response) => {
    if(auth.verifyToken(request, response)) {
        console.log("in put request");
        const userId = request.params.userId;
        const userBody = request.body;
        const postRes = await UserModel.updateUser(userId, userBody);
        response.send(postRes);
    }
    else{
        return response.status(401).send("Invalid Token");
    }
  });

module.exports = router