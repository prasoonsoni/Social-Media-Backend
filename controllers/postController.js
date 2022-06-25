const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')
const Post = require('../models/post/Post')
const Posts = require('../models/post/Posts')
const { ObjectId } = require('mongodb')

const createPost = async (req, res) => {
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
}

const updatePost = async (req, res) => {
    try {
        const { title, description } = req.body
        const user_id = new ObjectId(req.user.user_id)
        const post_id = new ObjectId(req.params.id)
        const update = await Posts.updateOne({ user: user_id, 'posts._id': post_id }, { $set: { 'posts.$.title': title, 'posts.$.description': description } })
        if (!update.acknowledged) {
            return res.json({ success: false, message: "Cannot update post" })
        }
        res.json({ success: true, message: "Post updated successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

module.exports = { createPost, updatePost }