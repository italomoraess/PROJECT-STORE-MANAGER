const modelSales = require('../models/sales');

const getById = async (id) => {
  try {
    const product = await modelSales.getById(id);
    return product;
  } catch (error) {
    console.log(error);
    return { message: 'Erro no Servidor' };
  }
};

module.exports = {
  getById,
};