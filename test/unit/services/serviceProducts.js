const { expect } = require('chai');
const { stub } = require('sinon');

const modelProducts = require('../../../models/products')
const serviceProducts = require('../../../services/products');

describe('Retorna um unico produto produto', () => {
  describe('Quando retornado com sucesso', () => {
    const fakeProduct = {
        id: 1,
        name: 'produdo x',
        quantity: 10
    };

    const testProduct = {
      id: 1,
      name: 'produdo x',
      quantity: 10
    };

    before(() => {
      stub(modelProducts, 'getById').resolves([fakeProduct]);
    });
    after(() => {
      modelProducts.getById.restore();
    });
    it('Verifica se as propriedades estao inclusas', async () => {
      const result = await serviceProducts.getById(1);
      expect(result).to.deep.includes(testProduct);
    });
  });
});

describe('Inseri um novo produto', () => {
  describe('Quando retornado com sucesso', () => {
    const fakeProduct = {
        id: 1,
        name: 'produdo x',
        quantity: 10
    };

    before(() => {
      stub(modelProducts, 'create').resolves([fakeProduct]);
    });
    after(() => {
      modelProducts.create.restore();
    });
    it('Verifica se retorna id criado', async () => {
      const [result] = await serviceProducts.create(fakeProduct);
      expect(result.id).to.be.equal(1);
    });
  });
});