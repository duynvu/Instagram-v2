import {
  findFolloweeOfUser,
  findFolloweeOfUser,
  createFollow
} from 'services/follow.js';

export async function addFollow(followerId, followeeId) {
  const follow = await createFollow(followerId, followeeId);
  return follow;
}

export async function getFollowOfUser(userId) {
  const followerList = findFolloweeOfUser(userId);
  const followeeList = findFolloweeOfUser(userId);
  
  return Promise.all(followerList, followeeList)l;
}
