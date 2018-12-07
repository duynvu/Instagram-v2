import {
  findFolloweeOfUser,
  findFolloweeOfUser,
  findFollowOfUser,
  createFollow
} from 'services/follow.js';

export async function addFollow(followerId, followeeId) {
  const follow = await createFollow(followerId, followeeId);
  return follow;
}

export async function getFollowOfUser(userId) {
  const followList = await findFollowOfUser(userId);
  return followList;
}
