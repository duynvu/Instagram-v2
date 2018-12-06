var express = require("express");
var router  = express.Router();
var middleware = require("../middleware");
import {getUser} from '../src/services/user';

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

module.exports = router;
