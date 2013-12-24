var request = require('supertest'),
      app = require('../../../../server');

describe('GET /api/transactions/import', function(){
  it('respond with success', function(done){
    request(app)
      .get('/api/transactions/import')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});