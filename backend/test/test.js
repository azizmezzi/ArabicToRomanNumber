/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Convert Number to Romain!', () => {
  before(() => {
    // open the server-sent events
    chai.request(app).get('/GetRomainNumber');
  });
  // verify Covertion of the Number
  it('Covert Number', (done) => {
    chai
      .request(app)
      .post('/ConvertNumber')
      .send({ number: 5 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equals('V');
        done();
      });
  });

  // verify if there is a client
  it('status', (done) => {
    chai
      .request(app)
      .get('/status')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
