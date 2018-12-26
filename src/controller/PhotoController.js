var PhotoService = require("../services/photo");

exports.get = async (req, res, next) => {
	const user = await User.findById(req.user._id).populate('photos');

  const fList = await Follow
    .find({"follower": user._id})
    .populate({path: "followee", populate: {path: "photos"}})
    .then(list => list.map(f => f.followee.photos));

  const photos = [].concat(...fList, ...user.photos)
                      .sort((a,b) => a._id.getTimestamp > b._id.getTimestamp);

  for (var p of photos) {
    if (p.likes.length !== 0) {
      console.log(p.likes[0].toString());
      console.log(typeof p.likes[0].toString());
      console.log(req.user._id.toString());
      console.log(typeof req.user._id.toString());

	//   console.log(p.likes[0].toString() == req.user._id.toString());
	  console.log(p.likes.filter(id => id.toString() == req.user._id.toString()));

    }
  }
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