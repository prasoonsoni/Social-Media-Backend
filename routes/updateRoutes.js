const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const updateController = require('../controllers/updateController')

router.put('/profile', fetchuser, updateController.updateProflie)
router.put('/username', fetchuser, updateController.updateUsername)
router.put('/password', fetchuser, updateController.updatePassword)

module.exports = router