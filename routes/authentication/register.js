const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const Friend = require('../../models/Friend')
const Post = require('../../models/Post')


router.post('/', async (req, res) => {
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
        let friends = await Friend.create({
            user: user._id
        })

        // creating empty posts list
        let posts = await Post.create({
            user: user._id
        })

        res.json({ success: true, message: "Account created successfully." })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router