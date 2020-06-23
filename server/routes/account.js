const router = require('express').Router()
const accountController = require('../controllers/account')
const isActiveUser = require('../middleware/isActiveUser')

router.get('/', isActiveUser, accountController.getBalance)
router.post('/', isActiveUser, accountController.createAccount)
router.put('/', isActiveUser, accountController.updateAccount)
router.delete('/', isActiveUser, accountController.deleteAccount)


module.exports = router