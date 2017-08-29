const MongoClient = require('mongodb').MongoClient

var Q = require('q');

var db

var service = {};

MongoClient.connect('mongodb://Testuser:Test1234@ds157833.mlab.com:57833/meanstack', function(err, database) {
    if (err) return console.log(err)
    db = database
})

service.getAll = getAll;
service.createRecipe = createRecipe;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.collection('quotes').find().toArray(function(err, results) {
        deferred.resolve(results);
    })
    return deferred.promise;
}

function createRecipe(recipeParam){
    var deferred = Q.defer();
    console.log("Server Service:")
    console.log(recipeParam)
    db.collection('quotes').save(recipeParam, (err, result) => {
       deferred.resolve()
    })
    return deferred.promise;
}