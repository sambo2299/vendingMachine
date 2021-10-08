import  chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';
chai.use(chaiHttp);
const expect = chai.expect;

import {Items} from '../models/items/items.interface';

let items: Items[] = [];
let balance: number = 0;

describe('vending machine API Test', () => {
  const app = 'http://localhost:8080/api';
  it('should get all items', (done) => {
      chai.request(app)
      .get('/items')
      .set('content-type', 'application/json')
      .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('Items');
          items = res.body.Items;
          done();
      });
  }).timeout(5000);


  it('should get item info', (done) => {
    chai.request(app)
    .get('/items/'+ items[0].code)
    .set('content-type', 'application/json')
    .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('Item');
        done();
    });
  }).timeout(5000);

    it('should not get item info', (done) => {
      chai.request(app)
      .get('/items/'+ 'randomCode')
      .set('content-type', 'application/json')
      .end((err, res) => {
          expect(res.status).to.not.equal(200);
          done();
      });
    }).timeout(5000);

  it('should get item stock', (done) => {
    chai.request(app)
    .get('/stocks/'+ items[0].code)
    .set('content-type', 'application/json')
    .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('Item');
        done();
    });
}).timeout(5000);
  it('should buy item ', (done) => {
    const data = {
      amount: items[0].cost + 10
    }
    chai.request(app)
    .post('/items/buy/'+ items[0].code)
    .set('content-type', 'application/json')
    .send(data)
    .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('returnAmount');
        expect(res.body.returnAmount).to.equal(10);
        done();
    });
}).timeout(5000);
  it('should not buy item ', (done) => {
    const data = {
      amount: items[0].cost - 10
    }
    chai.request(app)
    .post('/items/buy/'+ items[0].code)
    .set('content-type', 'application/json')
    .send(data)
    .end((err, res) => {
        expect(res.status).to.not.equal(200);
        done();
    });
}).timeout(5000);
  it('should get balance', (done) => {
    const data = {
      amount: items[0].cost - 10
    }
    chai.request(app)
    .get('/balance')
    .set('content-type', 'application/json')
    .send(data)
    .end((err, res) => {
      // console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('balance');
        balance = res.body.balance;
        done();
    });
}).timeout(5000);

it('should refund item ', (done) => {
  chai.request(app)
  .post('/items/refund/'+ items[0].code)
  .set('content-type', 'application/json')
  .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('refundedAmount');
      expect(res.body.refundedAmount).to.equal(items[0].cost);
      done();
  });
}).timeout(5000);
it('should not refund item ', (done) => {
  chai.request(app)
  .post('/items/refund/')
  .set('content-type', 'application/json')
  .end((err, res) => {
      expect(res.status).to.not.equal(200);
      done();
  });
}).timeout(5000);
it('should get all transactions', (done) => {
  chai.request(app)
  .get('/transactions')
  .set('content-type', 'application/json')
  .end((err, res) => {
      expect(res.status).to.not.equal(200);
      expect(res.body).to.have.property('transactions');
      expect(res.body.transactions).length.greaterThan(0);
      done();
  });
}).timeout(5000);
});