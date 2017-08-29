var express = require('express');
var router = express.Router();

var recipesService = require('services/recipes.service');

router.post('/create', create);
router.get('/', getAll);

module.exports = router;

function getAll(req, res) {
    recipesService.getAll()
        .then(function (recipes) {
            res.status(200).json(recipes);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    console.log("Server Controller:")
    console.log(req.body)
    recipesService.createRecipe(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}