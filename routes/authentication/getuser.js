const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')
const User = require('../../models/User')

router.get('/', fetchuser, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.user_id })
        res.json({ success: true, user: user })
    } catch (error) {
        res.json({ success: false, message: "Authentication token is not valid." })
        console.log(error.message)
    }
})

module.exports = router