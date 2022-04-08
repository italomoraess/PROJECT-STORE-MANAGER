const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const modelSales = require('../../../models/sales');

describe('Sales Model', () => {

  const salesFake = [
    {
      saleId: 1,
      date: '2021-09-09T04:54:29.000Z',
      productId: 1,
      quantity: 2,
    },
    {
      saleId: 2,
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2,
    },
  ];
  const addProductsFake =  [{ id: 1, name: "produto", quantity: 10 }]

  describe('Requisição GET', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(salesFake);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se retorna um array', async () => {
      const result = await modelSales.getAll();
      expect(result).to.be.a('array');
    });
  });

  describe('Requisição GET por ID', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[salesFake[0]]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possui o ID igual a 1', async () => {
      const result = await modelSales.getById(1);
      expect(result.id).to.be.equal(1);
    });
  });
});

