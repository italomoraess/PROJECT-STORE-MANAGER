const { expect } = require('chai');
const { stub, match } = require('sinon');

const modelSales = require('../../../models/sales');
const serviceSales = require('../../../services/sales');
const controllerSales = require('../../../controllers/sales');

describe('Retorna Todos os produtos', () => {
  describe('Quando retornado com sucesso', () => {
    const testSale = [
      {
        "saleId": 1,
        "date": "2022-04-09T21:24:35.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "saleId": 1,
        "date": "2022-04-09T21:24:35.000Z",
        "productId": 2,
        "quantity": 10
      },
      {
        "saleId": 2,
        "date": "2022-04-09T21:24:35.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];

    const res = {};
    const req = {};

    before(() => {
      stub(modelSales, 'getAll').resolves(testSale);
      res.status = stub().returns(res);
      res.json = stub().returns();
    });
    after(() => {
      modelSales.getAll.restore();
    });
    it('Verifica status', async () => {
      await controllerSales.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('Verifica Json', async () => {
      await controllerSales.getAll(req, res);
      expect(res.json.calledWith(match.array)).to.be.equal(true);
    });
  });
});

describe('Retorna um unico produto produto', () => {
  describe('Quando retornado com sucesso', () => {
    const testSale = [
      {
        "date": "2022-04-09T21:24:35.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];

    const res = {};
    const req = {};

    before(() => {
      stub(serviceSales, 'getById').resolves(testSale);
      res.status = stub().returns(res);
      res.json = stub().returns();
      req.params = stub().returns();
    });
    after(() => {
      serviceSales.getById.restore();
    });
    it('Verifica status', async () => {
      await controllerSales.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
