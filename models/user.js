var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {
    	type: String,
    	unique: true
    },
    password: String,
    fullname: String,
    avatar: {
        type: String,
        default: '../image/user_avatar.jpg'
    },
    description: {
        type: String,
        default: 'This is my bio'
    },
    photos: [
    	{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "Photo"
    	}
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);