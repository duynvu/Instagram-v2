var express = require("express");
var router  = express.Router();
var middleware = require("../src/middleware");
var PhotoController = require('../src/controller/PhotoController');

router.get('/', PhotoController.get);

router.get('/new', middleware.isLoggedIn, PhotoController.get_new);
router.post('/', middleware.isLoggedIn, PhotoController.post);

router.get("/:id", PhotoController.get_id);

module.exports = router;
