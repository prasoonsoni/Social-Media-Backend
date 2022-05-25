require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

router.post('/', async (req, res) => {
    try {
        const { username_or_email, password } = req.body
        // checking if user is trying to login with email or username
        let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        var loginUsing = ""
        var user = {};
        if (username_or_email.match(pattern)) {
            loginUsing = "email"
            user = await User.findOne({ email: username_or_email });
        } else {
            loginUsing = "username"
            user = await User.findOne({ username: username_or_email });
        }

        // if credentials are wrong
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist." })
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.json({ success: false, message: "Incorrect Password." })
        }

        // generating token
        const data = {
            user: {
                user_id: user._id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET_KEY)
        res.json({ success: true, authtoken: authtoken })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router