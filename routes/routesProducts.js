const express = require('express');

const controllerProducts = require('../controllers/products');

const router = express.Router();

router.get('/', controllerProducts.getAll);
router.get('/:id', controllerProducts.getById);

module.exports = router;