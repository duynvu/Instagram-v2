var express = require("express");
var router  = express.Router();
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var User =  require("../models/user");
var Follow = require("../models/follow");
var Comment = require("../models/comment");

router.get("/:id",middleware.isLoggedIn, async function(req,res) {
	// User
	//   .findById(req.params.id)
	//   .populate("photos")
	//   .exec(function(err, user) {
	// 	if(err) {
	// 		console.log(err);
	// 	}
		
	// 	console.log(req.params.id)
		
	// 	if(req.user._id.equals(req.params.id)){
	// 		res.render("users/index", {user:user, isCurrentUser: true});
	// 	} else {
	// 		res.render("users/index", {user:user, isCurrentUser: false});
	// 	}
		
	// });
	const user = await User.findById(req.params.id).populate('photos');
	if(!req.user._id.equals(req.params.id)) {
		const isFollow = await Follow.find({$and: [{'follower': req.user._id}, {'followee': req.params.id}]});
		console.log(isFollow);
		// res.render("users/index", {user:user, isFollow: isFollow});
	} else {
		res.render("user/index", {user:user});
	}
});

router.post("/:id/follow", function(req, res) {
	Follow.create({
		follower: req.user.id,
		followee: req.params.id
	}, function(err, follow) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		// console.log(follow);
		res.sendStatus(200);
	})
})

router.delete("/:id/follow", function(req, res) {
	Follow.move({
		follower: req.user.id,
		followee: req.params.id
	}, function(err) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
})

module.exports = router;
