var express = require('express');
var router = express.Router();

//var cors = require('cors');

var recipesService = require('services/recipes.service');

//controller.use(cors())
//controller.options('*', cors());
//controller.use(bodyParser.urlencoded({ extended: false }));
//controller.use(bodyParser.json());

router.post('/create', create);
router.get('/', getAll);
//router.head('/create', head);
//router.options('*', cors());
//router.post('/create', cors(), create);

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

/*function head(req, res){
    res.send(204);
}
*/

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