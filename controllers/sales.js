const modelSales = require('../models/sales');
const serviceSales = require('../services/sales');

const getAll = async (req, res) => {
  try {
    const sale = await modelSales.getAll();
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await serviceSales.getById(id);
    if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

const create = async (req, res) => {
  try {
    const sale = await serviceSales.create(req.body);
    console.log(sale);
    return res.status(201).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await serviceSales.update(id, ...req.body);

    return res.status(200).json(sale);
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
};