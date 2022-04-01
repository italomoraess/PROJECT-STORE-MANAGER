const express = require('express');

const controllerSales = require('../controllers/sales');
const { verifyProductID, verifyQuantity } = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/', controllerSales.getAll);
router.get('/:id', controllerSales.getById);
router.post('/', verifyProductID, verifyQuantity);
router.put('/:id', verifyProductID, verifyQuantity);

module.exports = router;