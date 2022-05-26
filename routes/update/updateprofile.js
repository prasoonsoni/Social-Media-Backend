const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const User = require('../../models/User')

router.put('/', fetchuser, async (req, res) => {
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
})

module.exports = router