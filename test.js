const mongoose = require('mongoose');

const User = require('./models/user');
const Photo = require('./models/photo');
const Follow = require('./models/follow');

mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });

(async () => {
  // const userList = User.find();
  const user = await User.findOne({username: "duy"}).populate('photos');
  // const user = user[0];

  const fList = await Follow
    .find({"follower": user._id})
    .populate({path: "followee", populate: {path: "photos"}})
    .then(list => list.map(f => f.followee.photos));
                            // .populate(
                            //   {path:"follower",
                            //     populate:
                            //       {path:"photos",
                            //         populate: {path:"author"}}});
                            // .then(list => list.map(f => f.followee.photos));
  // const pList = fList.map(f => f.photos)
  // const user = await User.find({username: "duy"}).populate('photos');


  const photoList = [].concat(...fList, ...user.photos).sort((a,b) => a._id.getTimestamp > b._id.getTimestamp);
  photoList.forEach(p => {
    console.log(p._id.getTimestamp());
    console.log(p);
  })
})()
