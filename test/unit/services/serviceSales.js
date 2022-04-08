const { expect } = require('chai');
const sinon = require('sinon');

const modelSales = require('../../../models/sales');
const serviceSales = require('../../../services/sales')

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
  const addSalesFake = [
    {
      saleId: 2,
      date: '2021-09-09T04:54:54.000Z',
      productId: 2,
      quantity: 2,
    }
  ];

  describe('Requisição GET por ID', () => {
    before(() => {
      sinon.stub(modelSales, 'getById').resolves([[salesFake[0]]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possui o ID igual a 1', async () => {
      const result = await serviceSales.getById(1);
      expect(result.id).to.be.equal(1);
    });
  });

  describe('Requisição POST', () => {
    before(() => {
      sinon.stub(modelSales, 'create').resolves([{ insertId: 1 }]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Se possuir o insertId igual a 1', async () => {
      const result = await serviceSales.create(addSalesFake);
      expect(result.insertId).to.be.equal(1);
    });
  });
});

