const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const userController = require('../controllers/userController')

router.get('/getuser', fetchuser, userController.getUser)
router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router