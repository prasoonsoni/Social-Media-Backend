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
            _id: new ObjectId(),
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

const deleteComment = async (req, res) => {
    try {
        const post_id = new ObjectId(req.params.id)
        const comment_id = new ObjectId(req.params.comment_id)
        const user_id = new ObjectId(req.user.user_id)
        const comment = await Posts.findOne({
            'posts._id': post_id,
            'posts.comments._id': comment_id,
            'posts.comments.user_id': user_id,
        })
        if (!comment) {
            return res.json({ success: false, message: 'Comment not found.' })
        }
        const deleteComment = await Posts.updateOne(
            { 'posts._id': post_id, 'posts.comments._id': comment_id, 'posts.comments.user_id': user_id },
            { $pull: { 'posts.$.comments': { _id: comment_id } } }
        )
        if (!deleteComment.acknowledged) {
            return res.json({ success: false, message: 'Error deleting comment.' })
        }
        res.json({ success: true, message: 'Comment Deleted Successfully.' })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: 'Some internal server error occured.',
        })
    }
}

const updateComment = async (req, res) => {
    try {
        const post_id = new ObjectId(req.params.id)
        const comment_id = new ObjectId(req.params.comment_id)
        const user_id = new ObjectId(req.user.user_id)
        const comment = req.body.comment
        const comment_time = Date.now()
        const data = {
            _id: comment_id,
            user_id: user_id,
            comment: comment,
            comment_time: comment_time,
        }
        const updateComment = await Posts.updateOne(
            { 'posts._id': post_id, 'posts.comments._id': comment_id, 'posts.comments.user_id': user_id },
            { $pull: { 'posts.$.comments': { _id: comment_id } } }
        )
        const addComment = await Posts.updateOne(
            { 'posts._id': post_id },
            { $push: { 'posts.$.comments': data } }
        )
        if (!updateComment.acknowledged || !addComment.acknowledged) {
            return res.json({ success: false, message: 'Error updating comment.' })
        }
        res.json({ success: true, message: 'Comment Updated Successfully.' })
    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: 'Some internal server error occured.',
        })
    }
}



module.exports = { addComment, deleteComment, updateComment }
