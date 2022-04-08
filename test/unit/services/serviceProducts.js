const { expect } = require('chai');
const sinon = require('sinon');

const modelProducts = require('../../../models/products');
const serviceProducts = require('../../../services/products');

describe('Sales Model', () => {

  const productsFake = [
    {
      id: 1,
      name: 'produto x',
      quantity: 30,
    },
    {
      id: 2,
      name: 'produto y',
      quantity: 40,
    },
  ];
  const addProductsFake = [{ id: 1, name: "produto", quantity: 10 }]

  describe('Requisição GET por ID', () => {
    before(() => {
      sinon.stub(modelProducts, 'getByID').resolves([[productsFake[0]]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possui o ID igual a 1', async () => {
      const result = await serviceProducts.getById(1);
      expect(result.id).to.be.equal(1);
    });
  });

  describe('Requisição POST', () => {
    before(() => {
      sinon.stub(modelProducts, 'create').resolves([{ insertId: 1}]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possuir o insertId igual a 1', async () => {
      const result = await serviceProducts.create(addProductsFake);
      expect(result.insertId).to.be.equal(1);
    });
  });
});
