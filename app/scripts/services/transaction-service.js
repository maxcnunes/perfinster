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
      return $http.post(httpPath, model);
    },
    update = function(model){
      return $http.put(httpPath + '/' + model.id, model);
    },
    remove = function(id){
      return $http.delete(httpPath + '/' + id);
    };

    return {
      getAll: getAll,
      getById: getById,
      create: create,
      update: update,
      remove: remove
    };
  });
