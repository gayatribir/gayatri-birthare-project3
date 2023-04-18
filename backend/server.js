const express = require('express');
const helper = require('./apis/helper');
const pokemon = require('./apis/pokemon')
const tweet = require('./apis/tweet')
const user = require('./apis/user')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');
require("dotenv").config();
require("./config/database").connect();
const UserModel = require('./db/user/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const TweetModel = require('./db/tweet/tweet.model');
// const multer  = require('multer')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//setting options for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// SignUp 
app.post('/api/user/signup', async function(req, res) {
    const {firstName, lastName, userName, password} = req.body;

    try {
        if(!(firstName && lastName && userName && password)){return res.status(400).send("All inputs are required.");}

        const oldUser = await UserModel.findUserByUsername(userName);

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.createUser({firstName: firstName, lastName:lastName, userName: userName, password: encryptedPassword})

        // Create token
        const token = jwt.sign(
            { userId: newUser._id, userName },
            process.env.TOKEN_KEY,
            {expiresIn: "2h",}
        );
        newUser.token = token;

        res.cookie("userName", token);
        
        return res.status(200).send(newUser)
    
    } catch (e) {
        res.status(500).send(null);
        console.log(e);
    }
})

// SignIn
app.post('/api/user/signin', async function(req, res) {
    try {
        // Get user input
        const { userName, password } = req.body;
    
        // Validate user input
        if (!(userName && password)) {
          res.status(400).send("All inputs are required");
        }
        // Validate if user exist in our database
        const user = await UserModel.findUserByUsername(userName);
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { userId: user._id, userName },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
          res.cookie("userName", token);
    
          // user
          return res.status(200).send(user);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        res.status(500).send(null);
        console.log(err);
      }
})

//Get all tweets for guest session
app.get("/api/tweet/", async(req, res) => {
    let tweets = await TweetModel.returnAllTweets();
    res.status(200).send(tweets);
  });
  app.use('/api/tweet', tweet);

// const auth = require("./middleware/auth");
// app.use(auth.verifyToken);
app.use('/api/pokemon/', pokemon);
app.use('/api/user/', user)




// app.post("/welcome", auth, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });



let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist')

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});



app.listen(process.env.PORT || 8000, function() {
    console.log("Starting server now...")
})
