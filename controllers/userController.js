const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Friends = require('../models/friend/Friends')
const Posts = require('../models/post/Posts')

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.user_id }).select('-password')
        res.json({ success: true, user: user })
    } catch (error) {
        res.json({ success: false, message: "Authentication token is not valid." })
        console.log(error.message)
    }
}

const login = async (req, res) => {
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
}

const register = async (req, res) => {
    try {
        const { name, username, email, password, bio } = req.body

        // checking if email already exists
        let emailExists = await User.findOne({ email: email })
        if (emailExists) {
            return res.json({ success: false, message: "E-Mail already exists." })
        }

        // checking if username already exists
        let usernameExists = await User.findOne({ username: username })
        if (usernameExists) {
            return res.json({ success: false, message: "Username already taken." })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(password, salt)

        // creating new user
        let user = await User.create({
            name: name,
            username: username,
            email: email,
            password: securedPassword,
            bio: bio
        })

        // creating empty friends list
        let friends = await Friends.create({
            user: user._id
        })

        // creating empty posts list
        let posts = await Posts.create({
            user: user._id
        })

        res.json({ success: true, message: "Account created successfully." })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

module.exports = { getUser, login, register }