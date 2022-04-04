const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id as saleId, s.date, sp.product_id as productId, sp.quantity 
    FROM sales_products as sp 
    JOIN sales as s 
    ON s.id = sp.sale_id `,
    );

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute( 
  `SELECT s.date, sp.product_id as productId, sp.quantity 
  FROM sales_products as sp 
  JOIN sales as s 
  ON s.id = sp.sale_id 
  WHERE s.id = ?`, [id],
  );
  return sale;
};

const create = async (itemsSold) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales(date) VALUES(NOW())');

  console.log(itemsSold);

  await Promise.all(itemsSold.map(async (item) => {
  await connection
  .execute('INSERT INTO sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
  [insertId, item.productId, item.quantity]);
  }));
  
  return {
      id: insertId,
      itemsSold,
  };
};

const update = async (id, itemUpdated) => {
  await connection
    .execute('UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
    [itemUpdated.productId, itemUpdated.quantity, id]);
  
  return {
    saleId: id,
    itemUpdated: [
      itemUpdated,
    ],
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};