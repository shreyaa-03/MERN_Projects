const express = require('express')
const { getAllUsers, registerUser, verifyEmail } = require('../controllers/userController')
const router = express.Router()

router.route('/').get(getAllUsers)
router.route('/:id').get()
router.route('/login').post()
router.route('/register').post(registerUser)
router.route('/verify').get(verifyEmail)

module.exports = router