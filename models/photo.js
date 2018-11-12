var mongoose = require("mongoose");

var photoSchema = new mongoose.Schema({
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Type.ObjectId,
			ref:"User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],

	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Like"
		}
	],
	photo_tag: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Photo_tag"
		}
	] 
});

module.exports = mongoose.model("Photo",photoSchema);