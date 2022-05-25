const mongoose = require('mongoose')
const { Schema } = mongoose

const FriendSchema = new Schema(
    {
        status: String,
        friend_id: mongoose.Schema.Types.ObjectId
    }
)

module.exports = mongoose.model('Friend', FriendSchema)