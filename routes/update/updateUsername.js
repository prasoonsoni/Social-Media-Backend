const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const User = require('../../models/User')

router.put('/', fetchuser, async (req, res) => {
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
})

module.exports = router