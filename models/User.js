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
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    created_time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);