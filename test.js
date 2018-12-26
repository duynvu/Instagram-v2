const mongoose = require('mongoose');

const User = require('./models/user');
const Photo = require('./models/photo');
const Follow = require('./models/follow');

mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });

(async () => {
  const name = 'd';
  const users = await User.find({'username' : new RegExp(name, "i")});
  console.log(users);
})()
