var express = require("express");
var router  = express.Router();
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var User =  require("../models/user");


//INDEX - show all photos
router.get("/",middleware.isLoggedIn,function(req,res){
	console.log(req.user);
	const followeeList = await Follow.find("follower":req.user.username)
																	 .populate({ path:"followee",
																							 populate: { path:"photos" }})
																	 .map(f => f.followee);
	const photoList = followeeList.reduce((list,f) => list.concat(f.photos), []);
	res.render("home",{photos: photoList});
});




//NEW - show form to create new photo
router.get("/new", middleware.isLoggedIn ,function(req,res){
	res.render("photos/new");
})



//CREATE - create new photo
router.post("/", middleware.isLoggedIn ,function(req,res) {
	User.findById(req.user._id, function(err,user){
		if(err){
			console.log(err);
		}
		var caption = req.body.caption;
		var image = req.body.image;
		var author = {
			id: req.user._id,
			username: req.user.username
		}
		var newPhoto = {caption:caption, image:image, author:author};
		// console.log(newPhoto);
		Photo.create(newPhoto, function(err,photo){
			if(err){
				console.log(err);
			}
			console.log(photo);
			user.photos.push(photo);
			user.save();
			res.redirect('/photos');
		});
	});
});

//SHOW - shows more info about the photo
router.get("/:id", function(req,res){
	Photo.findById(req.params.id).populate("comments").exec(function(err,foundPhoto){
		if(err){
			console.log(err);
		} else {
			console.log(foundPhoto);
			res.render("photos/show",{photo: foundPhoto});
		}
	});
});



module.exports = router;
