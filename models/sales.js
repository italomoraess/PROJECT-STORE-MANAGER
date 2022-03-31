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

module.exports = {
  getAll,
  getById,
};