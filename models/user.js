var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    photos: [
    	{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "Photo"
    	}
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);