const express = require('express');

const controllerProducts = require('../controllers/products');
const { verifyName, verifyQuantity } = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', controllerProducts.getAll);
router.get('/:id', controllerProducts.getById);
router.post('/', verifyName, verifyQuantity);
router.put('/:id', verifyName, verifyQuantity);

module.exports = router;