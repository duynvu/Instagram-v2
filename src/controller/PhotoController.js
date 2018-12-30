var PhotoService = require("../services/photo");
const UserService = require("../services/user");
const FollowService = require("../services/follow")

exports.get = async (req, res, next) => {
	const user = await UserService.getUserWithPhotos(req.params.id);

  const fList = await Follow
    .find({"follower": user._id})
    .populate({path: "followee", populate: {path: "photos"}})
    .then(list => list.map(f => f.followee.photos));

  const photos = [].concat(...fList, ...user.photos)
                      .sort((a,b) => a._id.getTimestamp > b._id.getTimestamp);

	res.render('home', {photos: photos})
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