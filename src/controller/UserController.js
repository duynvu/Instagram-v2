const UserService = require('../services/user');
const FollowService = require('../services/follow');

exports.get_id = async (req, res, next) => {
  try {
    const user = UserService.getUserWithPhotos(req.params.id);
    const followList = FollowService.findFollowOfUser(req.params.id);
    
    await Promise.all([user, followList]);
  
    const isFollow = followList.filter(f => f.follower === req.user._id);
  
    const followerList = followList.filter(f => f.followee === req.params.id);
    const followeeList = followList.filter(f => f.follower === req.params.id);
  
    res.render("users/index", 
    {user,
    isFollow: !req.user._id.equals(req.params.id) ? isFollow: null, 
    followerList, 
    followeeList});
  } catch(e) {
    console.log(err);
    res.redirect('/');
  }
}

exports.post_follow = async (req, res, next) => {
  try {
    await FollowService.create(req.user.id, req.params.id);
    res.sendStatus(200);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
}

exports.delete_follow = async (req, res, next) => {
  try {
    await FollowService.remove(req.user.id, req.params.id);
    res.sendStatus(200);
  } catch(e) {
    console.log(e);
    res.sendStatus(500);
  }
}