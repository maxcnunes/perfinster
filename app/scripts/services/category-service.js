'use strict';

angular.module('perfinsterApp')
  .service('CategoryService', function CategoryService($http) {
    var httpPath = '/api/categories',
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
