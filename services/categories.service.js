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
service.deleteCategory = deleteCategory;
service.getCategoryById = getCategoryById;
service.updateCategory = updateCategory;
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

function deleteCategory(_id) {
    var deferred = Q.defer();
 
    db.collection(serverConfig.categoriesCollection).deleteOne({'_id': new mongodb.ObjectID(_id)}, (err, result) => {
        deferred.resolve()
    })

    return deferred.promise;
}

function getCategoryById(_id) {
    var deferred = Q.defer();
 
    db.collection(serverConfig.categoriesCollection).findOne({'_id': new mongodb.ObjectID(_id)}, (err, category) => {
        deferred.resolve(category)
    })

    return deferred.promise;
}

function updateCategory(_id, categoryParam){
    var deferred = Q.defer()

    var set = {
        name: categoryParam.name
    };
    
    db.collection(serverConfig.categoriesCollection).update({'_id': new mongodb.ObjectID(_id)}, { $set: set }, (err, result) => {
        deferred.resolve()
     })

    return deferred.promise;
}