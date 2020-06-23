const router = require('express').Router()
const authController = require('../controllers/auth')
const isActiveUser = require('../middleware/isActiveUser')

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', isActiveUser, authController.logout)

module.exports = router