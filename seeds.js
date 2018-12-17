var mongoose = require("mongoose");
var Photo   = require("./models/photo");
var User = require('./models/user');
var Comment  = require("./models/comment");
var Follow = require("./models/follow");

mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });


data = {
	users: [{
			  "username": "quangloc",
			  "fullname": "Pham Quang Loc"
			}, {
			  "username": "pwinram1",
			  "fullname": "Pieter Winram"
			}, {
			  "username": "chulls2",
			  "fullname": "Carleen Hulls"
			}, {
			  "username": "cfosserd3",
			  "fullname": "Celinka Fosserd"
			}, {
			  "username": "ovondra4",
			  "fullname": "Orrin Vondra"
			}, {
			  "username": "mmessage5",
			  "fullname": "Myca Message"
			}, {
			  "username": "cmacgarvey6",
			  "fullname": "Chandal MacGarvey"
			}, {
			  "username": "djans7",
			  "fullname": "Dorena Jans"
			}, {
			  "username": "tjeayes8",
			  "fullname": "Twila Jeayes"
			}, {
			  "username": "ogrumley9",
			  "fullname": "Orton Grumley"
			}],

	photos: [{
			  "image": "http://dummyimage.com/498x481.bmp/5fa2dd/ffffff",
			  "caption": "vel nisl duis ac nibh fusce lacus"
			}, {
			  "image": "http://dummyimage.com/346x343.png/dddddd/000000",
			  "caption": "justo morbi ut"
			}, {
			  "image": "http://dummyimage.com/356x491.jpg/cc0000/ffffff",
			  "caption": "massa id nisl venenatis lacinia aenean sit amet justo morbi"
			}, {
			  "image": "http://dummyimage.com/181x325.jpg/ff4444/ffffff",
			  "caption": "eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies"
			}, {
			  "image": "http://dummyimage.com/372x320.png/5fa2dd/ffffff",
			  "caption": "lorem integer"
			}, {
			  "image": "http://dummyimage.com/340x520.png/cc0000/ffffff",
			  "caption": "quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum"
			}, {
			  "image": "http://dummyimage.com/322x417.bmp/5fa2dd/ffffff",
			  "caption": "interdum venenatis turpis enim blandit"
			}, {
			  "image": "http://dummyimage.com/139x239.png/dddddd/000000",
			  "caption": "urna pretium"
			}, {
			  "image": "http://dummyimage.com/370x546.bmp/cc0000/ffffff",
			  "caption": "duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis"
			}, {
			  "image": "http://dummyimage.com/365x177.jpg/5fa2dd/ffffff",
			  "caption": "ut dolor"
			}]	
}

async function seed() {
	// Drop Database
	await Promise.all([
		User.remove({}), 
		Photo.remove({}), 
		Follow.remove({}), 
		Comment.remove({})
	]);

	// Add users
	const users = await Promise.all(data.users.map(u => User.register(u, '123')));
	
	const usersId = users.map((p, index) => index % 3);

	// Add photos
	const photos = await Promise.all(
		data.photos.map((p, index) => Photo.create(
			{
				...p,
				author: {
					id: users[usersId[index]]._id,
					username: users[usersId[index]].username
				}
			}
		)))

	// Add follow
	const follows = await Promise.all()
	console.log(photos);
}

seed();