var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");

const ControllerHandler = (promise, param) => async (req, res, next) => {
    const boundParams = params ? params[req, res, next] : [];
    try {
        const result = await promise(...boundParams);
        return res.json(result || {message: 'OK'})
    } catch(e) {
        return rs.status(500) && next(e);
    }
}

const c = ControllerHandler;

router.get('/user/:username', c(getUser, (req, res, next) => [req.params.username] ))
router.get('/:id', middleware.isLoggedIn, (req, res, next) => [req.params.id]);

router.get("/:id",middleware.isLoggedIn, function(req,res) {
	User
	  .findById(req.params.id)
	  .populate("photos")
	  .exec(function(err, user) {
		if(err) {
			console.log(err);
		}
		// console.log(user);
		res.render("users/index", {user:user});
	});
});

router.post("/:id/follow", function(req, res) {
	Follow.create({
		follower: req.user.id,
		followee: req.params.id
	}, function(err, follow) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		// console.log(follow);
		res.sendStatus(200);
	})
})

router.delete("/:id/follow", function(req, res) {
	Follow.move({
		follower: req.user.id,
		followee: req.params.id
	}, function(err) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
})

outer.get("/:id",middleware.isLoggedIn, async function(req,res) {
	const user = await User.findById(req.params.id).populate('photos');
	const followList = await Follow.find(
		{$or: [{'follower': req.params.id},
			   {'followee': req.params.id}]}
	);

	const isFollow = followList.filter(f => f.follower === req.user._id);

	const followerList = followList.filter(f => f.followee === req.params.id);
	const followeeList = followList.filter(f => f.follower === req.params.id);

	console.log(followeeList, followerList);


	if(!req.user._id.equals(req.params.id)) {
		// render page of otherUser

		res.render("users/index",
			{user,
			isFollow,
			followerList,
			followeeList});
	} else {
		// render page of currentUser
		res.render("users/index",
			{user:user,
			isFollow: null,
			followerList: followerList,
			followeeList: followeeList});
	}
});

router.post("/:id/follow", function(req, res) {
	Follow.create({
		follower: req.user.id,
		followee: req.params.id
	}, function(err, follow) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		// console.log(follow);
		res.sendStatus(200);
	})
})



router.delete("/:id/follow", function(req, res) {
	Follow.remove({
		follower: req.user.id,
		followee: req.params.id
	}, function(err) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		}
		res.sendStatus(200);
	})
})

module.exports = router;
