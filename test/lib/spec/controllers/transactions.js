var request = require('supertest'),
      app = require('../../../../server');

describe('API::TRANSACTIONS', function(){
  describe('GET /api/transactions', function(){
    it('responds with success', function(done){
      request(app)
        .get('/api/transactions')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /api/transactions', function(){
    it('responds with success', function(done){
      request(app)
        .post('/api/transactions')
        .send({amount: 10, type: 'DEBIT'})
        .expect(200, done);
    });

    it('responds with internal error when not send data', function(done){
      request(app)
        .post('/api/transactions')
        .expect(500, done);
    });
  });

  describe('POST /api/transactions/import', function(){
    it('responds with success', function(done){
      request(app)
        .post('/api/transactions/extract/read')
        .attach('file', __dirname + '/../../fixtures/extract.ofx')
        .expect(200, done);
    });

    it('responds with bad request when not send a file', function(done){
      request(app)
        .post('/api/transactions/extract/read')
        .expect(400, done);
    });
  });
});