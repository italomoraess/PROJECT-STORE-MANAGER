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

const create = async (product) => {
  try {
    const postProduct = await modelProducts.create(product);
    return postProduct;
  } catch (error) {
    console.log(error);
    return { message: 'Erro no Servidor' };
  }
};

const update = async (customer) => {
  try {
    const { id, name, quantity } = customer;

    const updatedProduct = await modelProducts.update({ id, name, quantity });

    return updatedProduct;
  } catch (error) {
    console.log(error);
    return { message: 'Erro no Servidor' };
  }
};

module.exports = {
  getById,
  create,
  update,
};