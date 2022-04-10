const { expect } = require('chai');
const { stub } = require('sinon');

const modelSales = require('../../../models/sales');
const serviceSales = require('../../../services/sales');

describe('Retorna um unico produto produto', () => {
  describe('Quando retornado com sucesso', () => {
    const fakeSale = [
      {
        "date": "2022-04-09T21:24:35.000Z",
        "productId": 3,
        "quantity": 15
      }
    ];
    before(() => {
      stub(modelSales, 'getById').resolves([fakeSale]);
    });
    after(() => {
      modelSales.getById.restore();
    });
    it('Verifica o tamanha do array', async () => {
      const result = await serviceSales.getById(1);
      expect(result).to.have.not.length(0);
    });
  });
});

describe('Inseri um novo produto', () => {
  describe('Quando retornado com sucesso', () => {
    const fakeSale = {
      "id": 4,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    };

    const testSale = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];

    before(() => {
      stub(modelSales, 'create').resolves(fakeSale);
    });
    after(() => {
      modelSales.create.restore();
    });
    it('Verifica se retorna id criado', async () => {
      const result = await serviceSales.create(testSale);
      expect(result).to.deep.includes(fakeSale);
    });
  });
});