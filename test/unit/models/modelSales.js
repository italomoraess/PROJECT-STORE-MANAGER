const { expect } = require('chai');
const { stub } = require('sinon');

const connection = require('../../../models/connection');
const modelSales = require('../../../models/sales');

describe('Retorna todos os produtos', () => {
  describe('Quando retornado com sucesso', () => {

    const fakeSales = [
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

    before(() => {
      stub(connection, 'execute').resolves([fakeSales]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um objeto', async () => {
      const result = await modelSales.getAll();
      expect(result).to.be.a('array');
    });
  });
});

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
      stub(connection, 'execute').resolves([fakeSale]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Verfica o tamanho do array', async () => {
      const result = await modelSales.getById(2);
      expect(result).to.not.have.length(0);
    });
  });
});