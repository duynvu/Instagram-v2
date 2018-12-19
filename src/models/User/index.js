var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const Validator = require('./validate');
// import { validateUsername } from './validate';

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate: [{ validator: Validator.validateUsername, msg: 'Username can\'t be blank.'}]
    },
    password: String,
    fullname: String,
    photos: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Photo"
        }
    ]

});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);

// module.exports = mongoose.model("User",UserSchema);
