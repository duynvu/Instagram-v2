var express = require("express");
var router  = express.Router();
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var User =  require("../models/user");

//INDEX - show all photos
router.get("/",function(req,res){
	res.render("photos/index");
});




//NEW - show form to create new photo
router.get("/new", middleware.isLoggedIn ,function(req,res){
	res.render("photos/new");
})


//CREATE - add new photo to DB
// router.post("/", middleware.isLoggedIn, function(req,res){
// 	var caption = req.body.caption;
// 	var image = req.body.image;
// 	var author =  {
// 		id: req.user._id,
// 		username: req.user.username
// 	}
// 	var newPhoto = {caption: caption, image: image, author:author}
// 	//Create a new photo and save to DB
// 	Photo.create(newPhoto, function(err, newlyCreated){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			//redirect back to photos page
// 			console.log(newlyCreated);
// 			res.redirect("/photos");
// 		}
// 	})
// })

router.post("/", middleware.isLoggedIn ,function(req,res) {
	User.findById(req.user._id, function(err,user){
		if(err){
			console.log(err);
		}
		Photo.create(req.body.photo, function(err,photo){
			if(err){
				console.log(err);
			}
			user.photos.push(photo);
			user.save();
			res.redirect('/photos');
		});
	});
});



module.exports = router;