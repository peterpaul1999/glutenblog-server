var mongodb = require('mongodb');

var Q = require('q');

var db

var service = {};

var MongoClient = mongodb.MongoClient

MongoClient.connect('mongodb://Testuser:Test1234@ds157833.mlab.com:57833/meanstack', function(err, database) {
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

    db.collection('quotes').find().toArray(function(err, results) {
        deferred.resolve(results);
    })
    return deferred.promise;
}

function getRecipeById(_id) {
    var deferred = Q.defer();
 
    db.collection('quotes').findOne({'_id': new mongodb.ObjectID(_id)}, (err, recipe) => {
        deferred.resolve(recipe)
    })

    return deferred.promise;
}

function createRecipe(recipeParam){
    var deferred = Q.defer()
    db.collection('quotes').save(recipeParam, (err, result) => {
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
    
    db.collection('quotes').update({'_id': new mongodb.ObjectID(_id)}, { $set: set }, (err, result) => {
        deferred.resolve()
     })

    return deferred.promise;
}

function deleteRecipe(_id) {
    var deferred = Q.defer();
 
    db.collection('quotes').deleteOne({'_id': new mongodb.ObjectID(_id)}, (err, result) => {
        deferred.resolve()
    })

    return deferred.promise;
}