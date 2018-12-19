var Photo = require("../models/photo");
var middleware = require("../middleware");

exports.get = (req, res, next) => {
  res.render('photos/index');
}

exports.get_new = (req, res, next) => {
  res.render('photos/new');
}

exports.post = (req,res) => {
  var caption = req.body.caption;
	var image = req.body.image;
	var author =  {
		id: req.user._id,
		username: req.user.username
	}

	var newPhoto = {caption: caption, image: image, author:author}
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
}

exports.photo_delete = (req, res) => {

}

exports.photo_edit = (req, res) => {

}

// import { findPhotoById, createPhoto} from 'services/photo.js';
//
// export async function getPhoto(photoId) {
//   const photo = findPhotoById(photoId);
//   // do sth
//   return photo;
// }
//
// export async function postPhoto(photo) {
//   const photo = createPhoto(photo);
//   return true;
// }
//
//
//
//
