const mongoose = require('mongoose')
const { Schema } = mongoose

const FriendsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friends: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Friend' }],
        default: []
    }
})

module.exports = mongoose.model('Friend', FriendsSchema)