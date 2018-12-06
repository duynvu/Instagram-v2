var express = require("express");
var router  = express.Router();


var User =  require("../models/user");
var Photo   = require("../models/photo");
var middleware = require("../middleware");
var PhotoController = require('../src/controller/PhotoController');

router.get('/', PhotoController.photo_get);
router.get('/new', middleware.isLoggedIn, PhotoController.photo_new_get);
router.post('/', middleware.isLoggedIn, PhotoController.photo_new_post);

// //INDEX - show all photos
// router.get("/",middleware.isLoggedIn,function(req,res){
// 	console.log(req.user);
// 	res.render("photos/index",{currentUser:req.user});
// });
//
//
// //NEW - show form to create new photo
// router.get("/new", middleware.isLoggedIn ,function(req,res){
// 	res.render("photos/new");
// })
//
// router.post("/", middleware.isLoggedIn ,function(req,res) {
// 	User.findById(req.user._id, function(err,user){
// 		if(err){
// 			console.log(err);
// 		}
// 		var caption = req.body.caption;
// 		var image = req.body.image;
// 		var newPhoto = {caption:caption, image:image, author:user._id};
// 		// console.log(newPhoto);
// 		Photo.create(newPhoto, function(err,photo){
// 			if(err){
// 				console.log(err);
// 			}
// 			console.log(photo);
// 			user.photos.push(photo);
// 			user.save();
// 			res.redirect('/photos');
// 		});
// 	});
// });



module.exports = router;
