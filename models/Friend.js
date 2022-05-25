const mongoose = require('mongoose')
const { Schema } = mongoose

const FriendSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friends: {
        type: [{ status: String, friend_id: mongoose.Schema.Types.ObjectId }],
        default: []
    }
})

module.exports = mongoose.model('Friend', FriendSchema)