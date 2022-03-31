const modelProducts = require('../models/products');

const getById = async (id) => {
  try {
    const product = await modelProducts.getById(id);
    return product;
  } catch (error) {
    console.log(error);
    return { message: 'Erro no Servidor' };
  }
};

module.exports = {
  getById,
};