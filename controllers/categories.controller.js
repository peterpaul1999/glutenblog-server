var express = require('express');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var multer = require('multer')

var categoriesService = require('services/categories.service');

router.post('/create', create);
router.delete('/delete/:_id', _delete);
router.get('/', getAll);
router.put('/update/:_id', update);
router.get('/:_id', getById);

module.exports = router;

function getAll(req, res) {
    categoriesService.getAll()
        .then(function (categories) {
            res.status(200).json(categories);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    categoriesService.createCategory(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    categoriesService.deleteCategory(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    console.log("Update ID: " + req.params._id)
    categoriesService.getCategoryById(req.params._id)
        .then(function (category) {
            if (category) {
                res.send(category);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    categoriesService.updateCategory(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}