const User = require('../models/User')

export function getUser(username) {
  return User.find({username}); // return promise
}

export function getUserById(id) {
  return User.findById(id);
}

export function updateUserById(id, user) {
  return User.findById(id, user);
}
