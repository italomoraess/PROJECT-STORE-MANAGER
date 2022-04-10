const { expect } = require('chai');
const { stub, match } = require('sinon');

const modelProducts = require('../../../models/products');
const serviceProducts = require('../../../services/products');
const controllerProducts = require('../../../controllers/products');

describe('Retorna Todos os produtos', () => {
  describe('Quando retornado com sucesso', () => {
    const testProduct = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      }
    ];

    const res = {};
    const req = {};

    before(() => {
      stub(modelProducts, 'getAll').resolves(testProduct);
      res.status = stub().returns(res);
      res.json = stub().returns();
    });
    after(() => {
      modelProducts.getAll.restore();
    });
    it('Verifica status', async () => {
      await controllerProducts.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('Verifica Json', async () => {
      await controllerProducts.getAll(req, res);
      expect(res.json.calledWith(match.array)).to.be.equal(true);
    });
  });
});

describe('Retorna um unico produto produto', () => {
  describe('Quando retornado com sucesso', () => {
    const testProduct = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };

    const res = {};
    const req = {};

    before(() => {
      stub(serviceProducts, 'getById').resolves(testProduct);
      res.status = stub().returns(res);
      res.json = stub().returns();
      req.params = stub().returns();
    });
    after(() => {
      serviceProducts.getById.restore();
    });
    it('Verifica status', async () => {
      await controllerProducts.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
