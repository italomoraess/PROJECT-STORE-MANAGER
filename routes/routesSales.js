const express = require('express');

const controllerSales = require('../controllers/sales');

const router = express.Router();

router.get('/', controllerSales.getAll);
router.get('/:id', controllerSales.getById);

module.exports = router;