const express = require("express");
const router  = express.Router();
const passport = require("passport");
const IndexController = require("../src/controller/IndexController");

router.get('/', IndexController.get);

router.get("/register", IndexController.get_register);
router.post("/register", IndexController.post_register);

//show login form
router.get("/login", IndexController.get_login);
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/photos",
        failureRedirect: "/login"
    }), IndexController.post_login);

//logout route
router.get("/logout", IndexController.get_logout);

//middleware
// function isLoggedIn{
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;
