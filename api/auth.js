const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");


router.post("/", async (req, res) => {
    const { email, password } = req.body.user;  

    if (!isEmail(email)) return res.status(401).send("Invalid Email");

    if (password.length < 6) {
      return res.status(401).send("Password must be atleast 6 characters");
    }
  
    try {
        //as select:false for password field
        const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
            "+password"
          );
        if (!user) return res.status(401).send("Invalid Credentials");

        // compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // create and sign JWT token
        const payload = {
            user: {
                id: user._id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" }, // token expires in 1 day
            (err, token) => {
                if (err) throw err;
                // set JWT token as cookie
                res.cookie('token', token, { httpOnly: true });
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
})

module.exports = router;