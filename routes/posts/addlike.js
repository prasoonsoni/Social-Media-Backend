const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const User = require('../../models/User')
const Posts = require('../../models/post/Posts')
const { ObjectId } = require('mongodb')

router.post('/:id', fetchuser, async (req, res) => {
    try {
        const post_id = new ObjectId(req.params.id)
        const user_id = new ObjectId(req.user.user_id)

        // if post is already liked
        const ifAlreadyLiked = await User.findOne({ _id: user_id, 'post_liked.post_id': post_id })
        if (ifAlreadyLiked) {
            return res.json({ success: false, message: "You have already liked the post" })
        }

        // adding post to user's liked posts
        const addToUser = await User.updateOne({ _id: user_id },
            {
                $push:
                {
                    post_liked:
                        { post_id: post_id, liked_time: Date.now() }
                }
            }
        )

        // adding user to likes of post
        const addToPost = await Posts.updateOne({ 'posts._id': post_id },
            {
                $push:
                {
                    'posts.$.likes':
                        { user_id: user_id, liked_time: Date.now() }
                }
            }
        )

        if (!addToPost.acknowledged || !addToUser.acknowledged) {
            return res.json({ success: false, message: "Error adding like." })
        }

        res.json({ success: true, message: "Like Added Successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router

