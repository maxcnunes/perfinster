var request = require('supertest'),
      app = require('../../../../server');

describe('GET /api/transactions/import', function(){
  it('responds with success', function(done){
    request(app)
      .post('/api/transactions/import')
      .attach('file', __dirname + '/../../fixtures/extract.ofx')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });

  it('responds with bad request when not send a file', function(done){
    request(app)
      .post('/api/transactions/import')
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});