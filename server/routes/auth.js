const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

const DB = process.env.MONGODB_URI;

mongoose.connect(DB).then(() =>{
    console.log(`connection successful`)
}).catch((err) =>console.log(`error in connection`));

const User = require("../models/User");

router.use(cors({
    origin: 'https://gen-z-store.vercel.app',  // Replace with your Vercel frontend URL
    credentials: true,
}));

// Using async await

router.post('/signup', async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the form properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords are not matching" });
        } else {

            const user = new User({ name, email, password, cpassword });
            // Before saving the registration details we will hash the codes
            await user.save();
            return res.status(201).json({ message: "User registered successfully" });
        }

    } catch (err) {
        console.log(err);
    }

});

// login route

router.post('/login', async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credientials" });
            } else {
                res.json({ message: "User SignIn successfully" })
            }
        } else {
            res.status(400).json({ error: "Invalid Credientials" });
        }


    } catch (err) {
        console.log(err);
    }
})

// Very important as we use cookie parser otherwise it won't work
router.use(cookieParser());


// Get user data for contact us and home page

router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
});

// Logout page
router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
});


module.exports = router;