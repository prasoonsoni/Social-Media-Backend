const mongoose = require('mongoose')
const { Schema } = mongoose

const PostsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    posts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    }
})

module.exports = mongoose.model('Post', PostsSchema)