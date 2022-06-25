const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const postController = require('../controllers/postController')

router.post('/create', fetchuser, postController.createPost)
router.put('/update/:id', fetchuser, postController.updatePost)

module.exports = router