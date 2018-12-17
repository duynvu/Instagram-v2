const mongoose = require('mongoose');

const User = require('./models/user');
const Photo = require('./models/photo');
const Follow = require('./models/follow');

mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });

(async () => {
  // const userList = User.find();
  const fList = await Follow.find()
                            .populate({path:"follower",
                              populate:
                                {path:"photos",
                                  populate: {path:"author"}}});
                            // .then(list => list.map(f => f.followee.photos));
  // const pList = fList.map(f => f.photos)

  console.log(fList);

})()
