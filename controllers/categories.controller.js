var express = require('express');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var multer = require('multer')

var categoriesService = require('services/categories.service');

router.post('/create', create);
router.get('/', getAll);

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