var express = require('express');
var crypto = require('crypto');
var mime = require('mime');
var router = express.Router();
var multer = require('multer')

var recipesService = require('services/recipes.service');

var DIR = './uploads/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
  });

var upload = multer({ storage: storage }).single('photo');

router.post('/upload/', uploadFile);

module.exports = router;

function uploadFile(req, res, next) {
    var path = '';
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       path = req.file.path;
       return res.send("Upload Completed for "+path); 
 });     
}