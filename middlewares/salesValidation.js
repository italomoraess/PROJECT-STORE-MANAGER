const verifyProductID = (req, res, next) => {
  const { body } = req;
  body.map((item) => {
    if (!item.productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return next();
  });
};

const verifyQuantity = (req, res, next) => {
  const { body } = req;
  body.map((item) => {
    if (item.quantity === undefined) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (item.quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    return next();
  });
};

module.exports = {
  verifyProductID,
  verifyQuantity,
};