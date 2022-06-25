const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const dislikeController = require('../controllers/dislikeController')

router.post('/dislike/:id', fetchuser, dislikeController.addDislike)
router.delete('/dislike/:id', fetchuser, dislikeController.deleteDislike)

module.exports = router
