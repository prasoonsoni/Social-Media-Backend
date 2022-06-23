const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const postController = require('../controllers/postController')

router.post('/create', fetchuser, postController.createPost)
router.put('/update/:id', fetchuser, postController.updatePost)
router.post('/like/:id', fetchuser, postController.addLike)
router.delete('/like/:id', fetchuser, postController.deleteLike)
router.post('/dislike/:id', fetchuser, postController.addDislike)
router.delete('/dislike/:id', fetchuser, postController.deleteDislike)

module.exports = router