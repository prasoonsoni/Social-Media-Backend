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
            type: [{ type: mongoose.Schema.Types.ObjectId }],
            default: []
        },
        dislikes: {
            type: [{ type: mongoose.Schema.Types.ObjectId }],
            default: []
        },
        comments: {
            type: [{ comment: String, by: mongoose.Schema.Types.ObjectId }],
            default: []
        },
    }
)

module.exports = mongoose.model('Post', PostSchema)