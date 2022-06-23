const bcrypt = require('bcryptjs')
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')

const updatePassword = async (req, res) => {
    try {
        const { old_password, new_password } = req.body
        const user = await User.findOne({ _id: req.user.user_id })

        // matching hashes of old password and new password
        const passwordMatches = await bcrypt.compare(old_password, user.password);
        if (!passwordMatches) {
            return res.json({ success: false, message: "Password doesn't match." })
        }

        // hashing new password
        const salt = await bcrypt.genSalt(10)
        const securedPassword = await bcrypt.hash(new_password, salt)

        // updating password in the database
        const update = await User.updateOne({ _id: req.user.user_id }, { password: securedPassword })
        if (!update.acknowledged) {
            return res.json({ success: false, message: "Error changing password" })
        }

        res.json({ success: true, message: "Password changed successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

const updateProflie = async (req, res) => {
    try {
        const { name, bio } = req.body
        const user = await User.findOne({ _id: req.user.user_id })

        if (!user._id === req.user.user_id) {
            return res.json({ success: false, message: "You don't have access." })
        }

        const update = await User.updateOne({ _id: req.user.user_id }, { name: name, bio: bio })
        if (!update.acknowledged) {
            return res.json({ success: false, message: "Error updating profile." })
        }

        res.json({ success: true, message: "Profile updated successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

const updateUsername = async (req, res) => {
    try {
        const { new_username } = req.body
        const user = await User.findOne({ _id: req.user.user_id })

        if (new_username === user.username) {
            return res.json({ success: true, message: "Your current username." })
        }

        const alreadyTaken = await User.findOne({ username: new_username })
        if (alreadyTaken) {
            return res.json({ success: false, message: "Username already taken." })
        }

        const update = await User.updateOne({ _id: req.user.user_id }, { username: new_username })

        if (!update.acknowledged) {
            return res.json({ success: false, message: "Error changing username." })
        }

        res.json({ success: true, message: "Username changed successfully." })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
}

module.exports = { updatePassword, updateProflie, updateUsername }