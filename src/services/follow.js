const Follow = require('../models/Follow');

export function findFollowerOfUser(userId) {
  return Follow.find({'follower': userId})
               .populate('followee', 'username');
}

export function findFolloweeOfUser(userId) {
  return Follow.find({'followee': userId})
               .populate('follower', 'username');
}

export function createFollow(followerId, followeeId) {
  return Follow.create({
    follower: followerId,
    followee: followeeId
  })
}
