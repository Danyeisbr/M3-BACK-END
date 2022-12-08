const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.
//const { sumArray } = require('../sumArray')

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
    it('responds with the sum of 4 and 3', () =>
    agent.post('/sum')
      .send({a: 4, b: 3})
      .then((res) => {
        expect(res.body.result).toEqual(7);
      })
  );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
    it('responds with the product of 3 and 3', () =>
    agent.post('/product')
      .send({a: 3, b: 3})
      .then((res) => {
        expect(res.body.result).toEqual(9);
      })
  );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('devuelve true si la suma es igual a num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
      it('devuelve true si la suma es igual a num', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 30})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
  });

});

