const mongoose = require('mongoose');

const User = require('./models/user');
const Photo = require('./models/photo');
const Follow = require('./models/follow');

mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });

async function test(){
  // const userList = User.find();
  const fList = await Follow.find().populate({path:"followee", populate:{path:"photos"}}).map(f => f.followee);
  const pList = fList.reduce((list,f) => list.concat(f.photos), []);

   //const result = await Promise.all(fList.map(f => f.populate("photos")));
  //Photo.create(newPhoto, function(err,photo){
    //if(err){
      //console.log(err);
    //}
    //console.log(photo);
    //user.photos.push(photo);
    //user.save();
    //res.redirect('/photos');
  //});

  console.log(fList);

}
test();
