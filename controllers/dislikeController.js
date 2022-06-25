const User = require('../models/User')
const Posts = require('../models/post/Posts')
const { ObjectId } = require('mongodb')

const addDislike = async (req, res) => {
    try {
        const post_id = new ObjectId(req.params.id)
        const user_id = new ObjectId(req.user.user_id)

        // if post is already disliked
        const ifAlreadyDisliked = await User.findOne({ _id: user_id, 'post_disliked.post_id': post_id })
        if (ifAlreadyDisliked) {
            return res.json({ success: false, message: "You have already disliked the post" })
        }

        // if post is liked then removing like.
        const liked = await User.findOne({ _id: user_id, 'post_liked.post_id': post_id })
        if (liked) {
            const removeFromUser = await User.updateOne({ _id: user_id }, { $pull: { 'post_liked': { 'post_id': post_id } } })
            const removeFromPost = await Posts.updateOne({ 'posts._id': post_id }, { $pull: { 'posts.$.likes': { 'user_id': user_id } } })

            if (!removeFromPost.acknowledged || !removeFromUser.acknowledged) {
                return res.json({ success: false, message: "Error adding dislike." })
            }
        }

        // adding post to user's disliked posts
        const addToUser = await User.updateOne({ _id: user_id }, { $push: { post_disliked: { post_id: post_id, disliked_time: Date.now() } } })

        // adding user to dislikes of post
        const addToPost = await Posts.updateOne({ 'posts._id': post_id }, { $push: { 'posts.$.dislikes': { user_id: user_id, disliked_time: Date.now() } } })

        if (!addToPost.acknowledged || !addToUser.acknowledged) {
            return res.json({ success: false, message: "Error adding dislike." })
        }

        res.json({ success: true, message: "Dislike Added Successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

const deleteDislike = async (req, res) => {
    try {
        const user_id = new ObjectId(req.user.user_id)
        const post_id = new ObjectId(req.params.id)

        const ifDisliked = await User.findOne({ _id: user_id, 'post_disliked.post_id': post_id })
        if (!ifDisliked) {
            return res.json({ success: false, message: "You have already removed dislike from the post" })
        }

        const removeFromUser = await User.updateOne({ _id: user_id }, { $pull: { 'post_disliked': { 'post_id': post_id } } })
        const removeFromPost = await Posts.updateOne({ 'posts._id': post_id }, { $pull: { 'posts.$.dislikes': { 'user_id': user_id } } })

        if (!removeFromPost.acknowledged || !removeFromUser.acknowledged) {
            return res.json({ success: false, message: 'Error removing dislike from post.' })
        }
        res.json({ success: true, message: "Dislike Removed Successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

module.exports = { addDislike, deleteDislike }