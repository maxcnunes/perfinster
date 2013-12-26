module.exports = function(app) {

  var controllers = { 
    api: requireController('api'),
    transactions: requireController('transactions'),
    index: requireController('index')
  };

  configServerRoutes(app, controllers);
  configAngularRoutes(app, controllers);
};

function configServerRoutes (app, controllers) {
  app.get('/api/awesomeThings', controllers.api.awesomeThings);
  app.get('/api/transactions', controllers.transactions.get);
  app.post('/api/transactions', controllers.transactions.create);
  app.post('/api/transactions/import', controllers.transactions.import);
};

function configAngularRoutes (app, controllers) {
  app.get('/partials/*', controllers.index.partials);
  app.get('/', controllers.index.index);
};

function requireController (name) {
  return require('../controllers/' + name);
};