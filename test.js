const mongoose = require('mongoose')
const Photo = require('./models/photo')
const User = require('./models/user')

(async () => {
  const photo = Photo.find();
  console.log(await photo);
})()
