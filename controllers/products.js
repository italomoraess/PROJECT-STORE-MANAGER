const modelProducts = require('../models/products');
const serviceProducts = require('../services/products');

const getAll = async (req, res) => {
  try {
    const products = await modelProducts.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await serviceProducts.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  getAll,
  getById,
};