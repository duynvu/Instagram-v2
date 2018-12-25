var express = require("express");
var router  = express.Router();
var middleware = require("../src/middleware");
const UserController = require("../src/controller/UserController");

// const ControllerHandler = (promise, param) => async (req, res, next) => {
//     const boundParams = params ? params[req, res, next] : [];
//     try {
//         const result = await promise(...boundParams);
//         return res.json(result || {message: 'OK'})
//     } catch(e) {
//         return rs.status(500) && next(e);
//     }
// }
//
// const c = ControllerHandler;
//
// router.get('/api/:username', c(getUser, (req, res, next) => [req.params.username] ))
// router.get('/:id', middleware.isLoggedIn, (req, res, next) => [req.params.id]);

router.get("/:id", middleware.isLoggedIn, UserController.get_id);

router.post("/:id/follow", UserController.post_follow);
router.delete("/:id/follow", UserController.remove_follow);

module.exports = router;
