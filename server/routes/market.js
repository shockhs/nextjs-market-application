const router = require('express').Router()
const marketController = require('../controllers/market')


router.get('/', marketController.getAllProducts)
router.get('/id=?:id', marketController.getProduct)
router.get('/category=?:category', marketController.getCategoryProducts)
router.post('/add', marketController.addProduct)
router.put('/edit/id=?:id', marketController.editProduct)
router.delete('/delete/id=?:id', marketController.deleteProduct)


module.exports = router
