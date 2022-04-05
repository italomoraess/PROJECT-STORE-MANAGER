const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ? ', [id]);
  return product[0];
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(`INSERT INTO products(name, quantity)
  VALUES(?, ?)`, [name, quantity]);

  return {
    id: insertId,
    name,
    quantity,
  };
};

const getProductName = async (nameProduct) => {
  const [name] = await connection.execute('SELECT * FROM products where name = ?', 
  [nameProduct]);

  return name;
};

const update = async ({ id, name, quantity }) => {
  await connection.execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?',
      [name, quantity, id]);
  return {
      id,
      name,
      quantity,
  };
};

const getProductById = async (idProduct) => {
  const [id] = await connection.execute('SELECT * FROM products WHERE id = ?', 
  [idProduct]);

  return id;
};

const deleteId = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  getProductName,
  update,
  getProductById,
  deleteId,
};