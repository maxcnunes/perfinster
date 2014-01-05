'use strict';

angular.module('perfinsterApp')
  .service('TransactionService', function TransactionService($http) {
    var httpPath = '/api/transactions',
    getAll = function(){
      return $http.get(httpPath);
    },
    getById = function(id){
      return $http.get(httpPath + '/' + id);
    },
    create = function(model){
      onCreateUpdate(model);
      return $http.post(httpPath, model);
    },
    update = function(model){
      onCreateUpdate(model);
      return $http.put(httpPath + '/' + model.id, model);
    },
    remove = function(id){
      return $http.delete(httpPath + '/' + id);
    },
    onCreateUpdate = function (model) {
      model.amount = Number(model.amount.replace(/[^0-9\.]+/g,''));
    },
    importFile = function (files, uploader, callback) {
      return uploader.upload({
        url: httpPath + '/extract/read',
        headers: {},
        file: files[0],
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(callback);
    };

    return {
      getAll: getAll,
      getById: getById,
      create: create,
      update: update,
      remove: remove,
      importFile: importFile
    };
  });
