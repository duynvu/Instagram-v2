const User = require('../models/User');

class UserService {
  // All functions return Promise.

  static getUserByUsername(username) {
    return User.findOne({username});
  }

  static getUserById(id) {
    return User.findById(id);
  }

  static getUserWithPhotos(id) {
    return User.findById(id).populate("photos");
  }

  static registerUser(newUser, password) {
    return User.register(newUser,password);
  }

  static save(user) {
    return user.save();
  }
}

module.exports = {
  UserService,
}
