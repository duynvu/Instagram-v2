var express = require("express");
var router  = express.Router();
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var User =  require("../models/user");


router.get("/:id",middleware.isLoggedIn, function(req,res) {
	User
	  .findById(req.params.id)
	  .populate("photos")
	  .exec(function(err, user) {
		if(err) {
			console.log(err);
		}
		console.log(user);
		res.render("users/index", {user:user});
	});
});

module.exports = router;