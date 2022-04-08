const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const modelProducts = require('../../../models/products');

describe('Products Model', () => {

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
  const addProductsFake =  [{ id: 1, name: "produto", quantity: 10 }]

  describe('Requisição GET', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(productsFake);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se retorna um array', async () => {
      const result = await modelProducts.getAll();
      expect(result).to.be.a('array');
    });
  });

  describe('Requisição GET por ID', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[productsFake[0]]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possui o ID igual a 1', async () => {
      const result = await modelProducts.getById(1);
      expect(result.id).to.be.equal(1);
    });
  });

  describe('Requisição POST', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1}]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possuir o insertId igual a 1', async () => {
      const result = await modelProducts.create(addProductsFake);
      expect(result.insertId).to.be.equal(1);
    });
  });
});

