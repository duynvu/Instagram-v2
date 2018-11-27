var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
import { validateUsername } from './validate';

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate: [{ validator: validateUsername, msg: 'Username can\'t be blank.'}]
    },
    password: String,
    fullname: String
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

export default User;

// module.exports = mongoose.model("User",UserSchema);
