const express = require('express')
const router = express.Router()

router.route('/').get()
router.route('/:id').get()
router.route('/login').post()
router.route('/register').post()


module.exports = router