const router = require('express').Router()
const marketController = require('../controllers/market')
const isActiveUser = require('../middleware/isActiveUser')

router.get('/', marketController.getAllProducts)
router.get('/id=?:id', marketController.getProduct)
router.get('/category=?:category', marketController.getCategoryProducts)
router.post('/add', isActiveUser, marketController.addProduct)
router.put('/edit/id=?:id', isActiveUser, marketController.editProduct)
router.delete('/delete/id=?:id', isActiveUser, marketController.deleteProduct)


module.exports = router
