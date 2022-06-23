const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const User = require('../../models/User')
const Post = require('../../models/post/Post')
const Posts = require('../../models/post/Posts')

router.post('/', fetchuser, async (req, res) => {
    try {
        const { title, description } = req.body
        const user = await User.findOne({ _id: req.user.user_id })
        const post = Post({
            title: title,
            description: description
        })
        const posts = await Posts.findOne({ user: req.user.user_id })
        const addPost = await Posts.updateOne({ user: user._id }, { $push: { posts: post } })
        if (!addPost.acknowledged) {
            return res.json({ success: false, message: "Cannot add post." })
        }
        return res.json({ success: true, message: "Post added successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router