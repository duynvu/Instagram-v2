var express = require("express");
var router  = express.Router();
var Photo   = require("../models/photo");


//INDEX - show all photos





//NEW - show form to create new photo
router.get("/new", function(req,res){
	res.render("photos/new");
})


//CREATE - add new photo to DB
router.post("/", function(req,res){
	var caption = req.body.caption;
	var image = req.body.image;
		var author =  {
		id: req.user._id,
		username: req.user.username
	}

	var newPhoto = {caption: caption, image: image, author: author}
	//Create a new photo and save to DB
	Photo.create(newPhoto, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to photos page
			console.log(newlyCreated);
			res.redirect("/photos");
		}
	})
})


module.exports = router;