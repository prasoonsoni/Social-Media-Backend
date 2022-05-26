const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    post_liked: {
        type: [{
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                unique: true
            }
        }],
        default: []
    },
    post_disliked: {
        type: [{
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                unique: true
            }
        }],
        default: []
    },
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);