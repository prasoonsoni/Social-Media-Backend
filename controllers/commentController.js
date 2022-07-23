const User = require('../models/User')
const Posts = require('../models/post/Posts')
const { ObjectId } = require('mongodb')

const addComment = async (req, res) => {
    try {
        const post_id = new ObjectId(req.params.id)
        const user_id = new ObjectId(req.user.user_id)
        const comment = req.body.comment
        const comment_time = Date.now()
        const data = {
            user_id: user_id,
            comment: comment,
            comment_time: comment_time,
        }
        const addComment = await Posts.updateOne(
            { 'posts._id': post_id },
            { $push: { 'posts.$.comments': data } }
        )
        if (!addComment.acknowledged) {
            return res.json({ success: false, message: 'Error adding comment.' })
        }
        res.json({ success: true, message: 'Comment Added Successfully.' })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: 'Some internal server error occured.',
        })
    }
}

module.exports = { addComment }
