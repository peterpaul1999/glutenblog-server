var express = require('express');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var multer = require('multer')

var recipesService = require('services/recipes.service');

router.post('/create', create);
router.delete('/delete/:_id', _delete);
router.put('/update/:_id', update);
router.get('/', getAll);
router.get('/:_id', getById);

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

function getById(req, res) {
    console.log("Update ID: " + req.params._id)
    recipesService.getRecipeById(req.params._id)
        .then(function (recipe) {
            if (recipe) {
                res.send(recipe);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    recipesService.createRecipe(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    recipesService.updateRecipe(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    recipesService.deleteRecipe(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}