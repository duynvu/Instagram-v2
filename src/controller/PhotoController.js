var PhotoService = require("../services/photo");

exports.get = async (req, res, next) => {
  res.render('photos/index');
}

exports.get_new = async (req, res, next) => {
  res.render('photos/new');
}

exports.post = async (req,res, next) => {
	const newPhoto = {
		caption: req.body.caption,
		image: req.body.image,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	}
	
	try {
		const photo = PhotoService.create(newPhoto);
		const user = UserService.getUserById(id);
		
		await Promise.all([photo, user]);

		user.photos.push(photo._id);
		await UserServices.save(user);
		res.redirect('/');
	} catch(e) {
		console.log(e);
		res.redirect('/photos/new');
	}

}

exports.get_id = async (req, res, next) => {
	try {
		const photo = await PhotoService.findPhotoWithFullInformation(req.params.id);
		res.render("/photos/show",  { photo });
	} catch(e) {
		console.log(e);
		res.redirect('/');
	}
}

exports.photo_delete = (req, res) => {

}

exports.photo_edit = (req, res) => {

}