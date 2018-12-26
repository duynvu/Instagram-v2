var express = require("express");
var router  = express.Router({mergeParams: true});
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var bodyParser = require("body-parser");
var User =  require("../models/user");




router.post("/",middleware.isLoggedIn,function(req, res){
	Photo.findById(req.params.id, function(err, photo){
		if(err){
			console.log(err);
			res.redirect("/photos");
		} else {
			const likeList = photo.likes.push(req.user._id);
			photo.save();
			res.redirect("/photos");
		}
	});
});

module.exports = router;