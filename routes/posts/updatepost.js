const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const Posts = require('../../models/post/Posts')

router.put('/:id', fetchuser, async (req, res) => {
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
})

module.exports = router