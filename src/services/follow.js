const Follow = require('../models/Follow');

class FollowService {

  static findFollowerOfUser(userId) {
    return Follow.find({'follower': userId})
                 .populate('followee', 'username');
  }
  
  static findFolloweeOfUser(userId) {
    return Follow.find({'followee': userId})
                 .populate('follower', 'username');
  }
  
  static findFollowOfUser(userId) {
    return Follow.find({
      $or: [{'follower': userId},
            {'followee': userId}]
    }).populate('follower', 'followee');
  }
  
  static create(followerId, followeeId) {
    return Follow.create({
      follower: followerId,
      followee: followeeId
    })
  }
  
  static remove(followerId, followeeId) {
    return Follow.remove({
      follower: followerId,
      followee: followeeId
    }}
}