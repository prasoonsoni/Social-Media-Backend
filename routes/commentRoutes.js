const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const commentController = require('../controllers/commentController')

router.post('/comment/:id', fetchuser, commentController.addComment)

module.exports = router