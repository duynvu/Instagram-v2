const User = require('../models/User');
const PhotoService = require('./photos.js');

class UserService {
  static getUserByUsername(user) {
    return User.find({username});
  }

  static getUserById(id) {
    return User.findById(id);
  }




  static
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
