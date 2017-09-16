var mongodb = require('mongodb');
var serverConfig = require('../server.config');

var Q = require('q');

var db

var service = {};

var MongoClient = mongodb.MongoClient

MongoClient.connect(serverConfig.mongoDbConfig, function(err, database) {
    if (err) return console.log(err)
    db = database
})

service.createCategory = createCategory;
service.getAll = getAll;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.collection(serverConfig.categoriesCollection).find().toArray(function(err, results) {
        deferred.resolve(results);
    })
    return deferred.promise;
}

function createCategory(categoryParam){
    var deferred = Q.defer()
    db.collection(serverConfig.categoriesCollection).save(categoryParam, (err, result) => {
       deferred.resolve()
    })
    return deferred.promise;
}