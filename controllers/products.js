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

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const verify = await modelProducts.getProductName(name);
    if (verify.length !== 0) return res.status(409).json({ message: 'Product already exists' });

    const product = await serviceProducts.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const verify = await modelProducts.getProductById(id);
    if (verify.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = await serviceProducts.update({ ...req.body, id });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const deleteId = async (req, res) => {
  try {
    const { id } = req.params;
    const verify = await modelProducts.getProductById(id);
    if (verify.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    await modelProducts.deleteId(id);
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteId,
};