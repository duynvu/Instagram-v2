var express = require("express");
var router  = express.Router();
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var User =  require("../models/user");
var Follow = require("../models/follow");
var Comment = require("../models/comment");

router.get("/:id",middleware.isLoggedIn, async function(req,res) {
	const user = await User.findById(req.params.id).populate('photos');
	const followList = await Follow.find(
		{$or: [{'follower': req.params.id},
			   {'followee': req.params.id}]}
	);
	
	const isFollow = followList.filter(f => f.follower === req.user._id);

	const followerList = followList.filter(f => f.followee === req.params.id);
	const followeeList = followList.filter(f => f.follower === req.params.id);

	console.log(followeeList, followerList);


	if(!req.user._id.equals(req.params.id)) {
		// render page of otherUser

		res.render("users/index", 
			{user,
			isFollow, 
			followerList, 
			followeeList});
	} else {
		// render page of currentUser
		res.render("users/index", 
			{user:user, 
			isFollow: null,
			followerList: followerList, 
			followeeList: followeeList});
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
	Follow.remove({
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


// router.get("/followList",function(req,res){
	
// })


//UPDATE 
router.get("/:id/edit", function(req,res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			res.redirect("/users" + req.params.id);
		} else {
			res.render("users/edit", {user: foundUser});
		}
	});
});

router.put("/:id", function(req,res){
	User.findByIdAndUpdate(req.params.id, req.body.user , function(err, updatedUser){
		if(err){
			console.log(err);
		} else {
			console.log(updatedUser);
			res.redirect("/users/" + req.params.id);
		}
	});

});

module.exports = router;
