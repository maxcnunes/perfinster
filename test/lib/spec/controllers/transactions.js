var request = require('supertest'),
      app = require('../../../../server');

describe('API::TRANSACTIONS', function(){
  describe('GET /api/transactions', function(){
    it('responds with success2', function(done){
      request(app)
        .get('/api/transactions')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /api/transactions/import', function(){
    it('responds with success', function(done){
      request(app)
        .post('/api/transactions/import')
        .attach('file', __dirname + '/../../fixtures/extract.ofx')
        .expect(200, done);
    });

    it('responds with bad request when not send a file', function(done){
      request(app)
        .post('/api/transactions/import')
        .expect(400, done);
    });
  });
});