const { expect } = require('chai');
const sinon = require('sinon');

const controllerProduct = require('../../../controllers/products');
const serviceProduct = require('../../../services/products');

describe('Product Controller', () => {
  const productFake = {
    name: 'Produto x',
    quantity: 10,
  };
  
  const oneProduct = [
    {
      id: 1,
      name: "Martelo de Thor",
      quantity: 10,
    },
  ];

  const allProducts = [
    {
      id: 1,
      name: "Produto x",
      quantity: 10,
    },
    {
      id: 2,
      name: "Produto y",
      quantity: 20,
    },
    {
      id: 3,
      name: "Produto z",
      quantity: 30,
    },
  ];

  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  describe('Se criado com sucesso', () => {
    before(() => {
      sinon.stub(serviceProduct, 'create').resolves(productFake);
      req.body = productFake;
    });
    after(() => {
      serviceProduct.create.restore();
      req.body = undefined;
    });

    it('valida criação de produto', async () => {
      await controllerProduct.create(req, res);

      expect(res.status.calledWith(201)).to.be.equals(true);
      expect(res.json.calledWith(productFake)).to.be.equals(true);
    });
  });

  describe('verifica busca por todos os produtos', () => {
    before(() => {
      sinon.stub(serviceProduct, 'getAll').resolves(allProducts);
    });
    after(() => {
      serviceProduct.getAll.restore();
    });
    it('retorna todos os produtos', async () => {
      await controllerProduct.getAll(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(allProducts)).to.be.equal(true);
    });
  });

  describe('verifica busca por id o produtos', () => {
    before(() => {
      sinon.stub(serviceProduct, 'getById').resolves(allProducts);
    });
    after(() => {
      serviceProduct.getById.restore();
    });
    it('retorna um unico produto', async () => {
      await controllerProduct.getById(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(allProducts)).to.be.equal(true);
    });
  });
});