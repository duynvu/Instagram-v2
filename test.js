const mongoose = require('mongoose');

const User = require('./models/user');
const Photo = require('./models/photo');
const Follow = require('./models/follow');

mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });

(async () => {
<<<<<<< HEAD
  const name = 'd';
  const users = await User.find({'username' : new RegExp(name, "i")});
  console.log(users);
=======
  console.log("test");
  // const userList = User.find();
  const user = await User.findOne({username: "duy"}).populate('photos');
  // const user = user[0];

  // const fList = await Follow
  //   .find({"follower": user._id})
  //   .populate({path: "followee", populate: {path: "photos"}})
  //   .then(list => list.map(f => f.followee.photos));
                            // .populate(
                            //   {path:"follower",
                            //     populate:
                            //       {path:"photos",
                            //         populate: {path:"author"}}});
                            // .then(list => list.map(f => f.followee.photos));
  // const pList = fList.map(f => f.photos)
  // const user = await User.find({username: "duy"}).populate('photos');

  // const f = fList[0].populate("likes");
  // console.log()
  // const user = await 
  const p = await Photo.findById("5c2335b101dc8b0f47cfd136");
  console.log(p.likes);
  console.log(user._id);

  // console.log(typeof p.likes[0]);
  console.log(p.likes.filter(id => id.toString() === user._id.toString()));
  p.likes = p.likes.filter(id => id.toString() !== user._id.toString());
  await p.save();
  console.log(p)
  // Photo.findById(req.params.id, function(err, photo){
	// 	if(err){
	// 		console.log(err);
	// 		res.sendStatus(500);
	// 	} else {
	// 		photo.likes = photo.likes.filter( id => id !== req.user._id);
	// 		photo.save();
	// 		res.sendStatus(200);
	// 	}
	// });

  //
  // const photoList = [].concat(...fList, ...user.photos).sort((a,b) => a._id.getTimestamp > b._id.getTimestamp);
  // photoList.forEach(p => {
  //   console.log(p._id.getTimestamp());
  //   console.log(p);
  // })
>>>>>>> develop
})()
