const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema(
    {
        title: String,
        description: String,
        created_time: {
            type: Date,
            default: Date.now
        },
        last_updated: {
            type: Date,
            default: Date.now
        },
        likes: {
            type: [{ user_id: mongoose.Schema.Types.ObjectId }],
            default: []
        },
        dislikes: {
            type: [{ user_id: mongoose.Schema.Types.ObjectId }],
            default: []
        },
        comments: {
            type: [{ comment: String, user_id: mongoose.Schema.Types.ObjectId }],
            default: []
        },
    }
)

module.exports = mongoose.model('Post', PostSchema)