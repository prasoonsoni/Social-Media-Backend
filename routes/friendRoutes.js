const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const friendController = require('../controllers/friendController')

router.post('/:id', fetchuser, friendController.addFriend)
router.put('/:id', fetchuser, friendController.acceptRequest)

module.exports = router