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

service.getAll = getAll;
service.createRecipe = createRecipe;
service.getRecipeById = getRecipeById;
service.updateRecipe = updateRecipe;
service.deleteRecipe = deleteRecipe;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.collection(serverConfig.recipesCollection).find().toArray(function(err, results) {
        deferred.resolve(results);
    })
    return deferred.promise;
}

function getRecipeById(_id) {
    var deferred = Q.defer();
 
    db.collection(serverConfig.recipesCollection).findOne({'_id': new mongodb.ObjectID(_id)}, (err, recipe) => {
        deferred.resolve(recipe)
    })

    return deferred.promise;
}

function createRecipe(recipeParam){
    var deferred = Q.defer()
    db.collection(serverConfig.recipesCollection).save(recipeParam, (err, result) => {
       deferred.resolve()
    })
    return deferred.promise;
}

function updateRecipe(_id, recipeParam){
    var deferred = Q.defer()

    var set = {
        name: recipeParam.name,
        quote: recipeParam.quote
    };
    
    db.collection(serverConfig.recipesCollection).update({'_id': new mongodb.ObjectID(_id)}, { $set: set }, (err, result) => {
        deferred.resolve()
     })

    return deferred.promise;
}

function deleteRecipe(_id) {
    var deferred = Q.defer();
 
    db.collection(serverConfig.recipesCollection).deleteOne({'_id': new mongodb.ObjectID(_id)}, (err, result) => {
        deferred.resolve()
    })

    return deferred.promise;
}