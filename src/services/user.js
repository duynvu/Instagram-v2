const User = require('../models/User')

export function getUser(username) {
    return User.find({username}); // return promise
}
