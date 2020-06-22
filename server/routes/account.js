const router = require('express').Router()
const accountController = require('../controllers/account')


router.post('/', accountController.createAccount)
router.put('/', accountController.updateAccount)
router.delete('/', accountController.deleteAccount)


module.exports = router