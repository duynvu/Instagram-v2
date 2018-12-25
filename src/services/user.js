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
}

module.exports = {
  UserService,
}
//
// export function getUser(username) {
//   return User.find({username}); // return promise
// }
//
// export function getUserById(id) {
//   return User.findById(id);
// }
//
// export function updateUserById(id, user) {
//   return User.findById(id, user);
// }
//
// export function getUserWithPhotos(id) {
//     return User.findById(id).populate("photos");
// }
