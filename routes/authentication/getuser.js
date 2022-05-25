const express = require('express')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')

router.get('/', fetchuser, async (req, res) => {
    try {
        const user = req.user
        res.json({ success: true, user: user })
    } catch (error) {
        res.json({ success: false, message: "Authentication token is not valid." })
        console.log(error.message)
    }
})

module.exports = router