const { expect } = require('chai');
const { stub } = require('sinon');

const connection = require('../../../models/connection');
const modelProducts = require('../../../models/products');

describe('Retorna todos os produtos', () => {
  describe('Quando retornado com sucesso', () => {

    const fakeProducts = [
      {
        id: 1,
        name: 'produdo x',
        quantity: 10
      },
      {
        id: 2,
        name: 'produdo y',
        quantity: 10
      },
      {
        id: 3,
        name: 'produdo z',
        quantity: 10
      }
    ];

    before(() => {
      stub(connection, 'execute').resolves([fakeProducts]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um objeto', async () => {
      const result = await modelProducts.getAll();
      expect(result).to.be.a('array');
    });
  });
});

describe('Retorna um unico produto produto', () => {
  describe('Quando retornado com sucesso', () => {
    const fakeProduct = [
      {
        id: 1,
        name: 'produdo x',
        quantity: 10
      }
    ];

    const testProduct = {
      id: 1,
      name: 'produdo x',
      quantity: 10
    };

    before(() => {
      stub(connection, 'execute').resolves([fakeProduct]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Verifica se as propriedades estao inclusas', async () => {
      const result = await modelProducts.getById(1);
      expect(result).to.deep.includes(testProduct);
    });
  });
});