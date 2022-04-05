const verifyProductID = (req, res, next) => {
  const { body } = req;
  const verifyItem = body.some((item) => !item.productId);
    if (verifyItem) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return next(); 
};

const verifyQuantity = (req, res, next) => {
  const { body } = req;

  const verifyUndefined = body.some((item) => item.quantity === undefined);
  if (verifyUndefined) return res.status(400).json({ message: '"quantity" is required' });

  const verifyNumber = body.some((item) => item.quantity <= 0);
  if (verifyNumber) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  verifyProductID,
  verifyQuantity,
};