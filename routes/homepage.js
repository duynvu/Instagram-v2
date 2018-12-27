// var express = require("express");
// var router  = express.Router();
// var middleware = require("../middleware");

// var Photo   = require("../models/photo");
// var User =  require("../models/user");
// var Follow = require("../models/follow");


// //INDEX - show all photos
// router.get("/",middleware.isLoggedIn, async function(req,res){
//   const user = await User.findById(req.user._id).populate('photos');

//   const fList = await Follow
//     .find({"follower": user._id})
//     .populate({path: "followee", populate: {path: "photos"}})
//     .then(list => list.map(f => f.followee.photos));

//   const photos = [].concat(...fList, ...user.photos)
//                       .sort((a,b) => a._id.getTimestamp > b._id.getTimestamp);

//   for (var p of photos) {
//     if (p.likes.length !== 0) {
//       console.log(p.likes[0].toString());
//       console.log(typeof p.likes[0].toString());
//       console.log(req.user._id.toString());
//       console.log(typeof req.user._id.toString());

// 	//   console.log(p.likes[0].toString() == req.user._id.toString());
// 	  console.log(p.likes.filter(id => id.toString() == req.user._id.toString()));

//     }
//   }
// 	res.render('home', {photos: photos})

// });

router.post("/search",middleware.isLoggedIn, async function(req,res){
  if(err){
    console.log(err)
  } else {
    const name = req.body.search;
    const user = await User.find({'username' : new RegExp(name,"i")});
    console.log(users);
  }
});

module.exports = router;