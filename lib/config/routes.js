module.exports = function(app) {

  var controllers = { 
    api: requireController('api'),
    transactions: requireController('transactions'),
    categories: requireController('categories'),
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
  app.get('/api/categories', controllers.categories.get);
};

function configAngularRoutes (app, controllers) {
  app.get('/partials/*', controllers.index.partials);
  app.get('/', controllers.index.index);
};

function requireController (name) {
  return require('../controllers/' + name);
};