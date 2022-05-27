const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const User = require('../../models/User')
const Posts = require('../../models/post/Posts')
const { ObjectId } = require('mongodb')

router.delete('/:id', fetchuser, async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.user_id)
        const post_id = new ObjectId(req.params.id)

        const ifLiked = await User.findOne({ _id: user_id, 'post_liked.post_id': post_id })
        if (!ifLiked) {
            return res.json({ success: false, message: "You have already removed like from the post" })
        }

        const removeFromUser = await User.updateOne({ _id: user_id }, { $pull: { 'post_liked': { 'post_id': post_id } } })
        const removeFromPost = await Posts.updateOne({ 'posts._id': post_id }, { $pull: { 'posts.$.likes': { 'user_id': user_id } } })

        if (!removeFromPost.acknowledged || !removeFromUser.acknowledged) {
            return res.json({ success: false, message: 'Error removing like from post.' })
        }
        res.json({ success: true, message: "Like Removed Successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router