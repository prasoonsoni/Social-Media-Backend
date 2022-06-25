const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const likeController = require('../controllers/likeController')

router.post('/like/:id', fetchuser, likeController.addLike)
router.delete('/like/:id', fetchuser, likeController.deleteLike)

module.exports = router