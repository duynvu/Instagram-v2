var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

var Photo   = require("../models/photo");
var User =  require("../models/user");
var Follow = require("../models/follow");


//INDEX - show all photos
router.get("/",middleware.isLoggedIn, async function(req,res){
  const user = await User.findById(req.user._id).populate('photos');

  const fList = await Follow
    .find({"follower": user._id})
    .populate({path: "followee", populate: {path: "photos"}})
    .then(list => list.map(f => f.followee.photos));

  const photos = [].concat(...fList, ...user.photos)
                      .sort((a,b) => a._id.getTimestamp > b._id.getTimestamp);

	res.render('home', {photos: photos})

});

var User =  require("../models/user");
var Photo   = require("../models/photo");
var middleware = require("../middleware");
// var PhotoController = require('../src/controller/PhotoController');

import { getPhoto, postPhoto } from '../src/controller/PhotoController';

// router.get('/', PhotoController.photo_get);
// router.get('/new', middleware.isLoggedIn, PhotoController.photo_new_get);
// router.post('/', middleware.isLoggedIn, PhotoController.photo_new_post);

router.get('/', (req, res, res) => {
  render("photos/index");
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
