const express = require('express')
const { ObjectId } = require('mongodb')
const router = express.Router()
const fetchuser = require('../../middleware/fetchuser')


router.post('/:id', fetchuser, async (req, res) => {
    try {
        const {comment, user_id} = req.body
        const post_id = new ObjectId(req.params.id)
        
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Some internal server error occured." })
    }
})

module.exports = router