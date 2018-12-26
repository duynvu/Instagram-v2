var Photo = require("../models/photo");
var middleware = require("../middleware");

exports.get = async (req, res, next) => {
  res.render('photos/index');
}

exports.get_new = async (req, res, next) => {
  res.render('photos/new');
}

exports.post = async (req,res, next) => {
  const caption = req.body.caption;
	const image = req.body.image;
	const author =  {
		id: req.user._id,
		username: req.user.username
	}

	const newPhoto = {caption: caption, image: image, author:author}
	//Create a new photo and save to DB
	// try {
	// 	PhotoService.create
	// }
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

exports.get_id = async (req, res, next) => {
	Photo.findById(req.params.id).populate("comments").exec(function(err,foundPhoto){
		if(err){
			console.log(err);
		} else {
			console.log(foundPhoto);
			res.render("photos/show",{photo: foundPhoto});
		}
	});
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
