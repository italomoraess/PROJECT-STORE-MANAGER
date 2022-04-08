const { expect } = require('chai');
const sinon = require('sinon');

const controllerSale = require('../../../controllers/sales');
const serviceSale = require('../../../services/sales');

describe('Sale Controller', () => {
  const productFake = [
    {
      productId: 1,
      quantity: 10
    }
  ];

  const getAll = [
    {
      saleId: 1,
      date: "2022-04-04T00:41:29.000Z",
      productId: 1,
      quantity: 10
    }
  ];

  const saleFake = {
    id: 4,
    itemsSold: productFake
  };



  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  })

  describe('create sales', () => {
    before(() => {
      sinon.stub(serviceSale, 'create').resolves(saleFake);
      req.body = productFake;
    })

    after(() => {
      serviceSale.create.restore();
      req.body = undefined;
    })

    it('verifica criação de venda com sucesso', async () => {
      await controllerSale.create(req, res);

      expect(res.status.calledWith(201)).to.be.equals(true)
      expect(res.json.calledWith(saleFake)).to.be.equals(true);
    });
  })
  describe('verifica requisição de busca para todas as vendas', () => {
    before(() => {
      sinon.stub(serviceSale, 'getAll').resolves(getAll);
    })
    after(() => {
      serviceSale.getAll.restore();
    })
    it('retorna vendas', async () => {
      await controllerSale.getAll(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(getAll)).to.be.equal(true);
    })
  })
})