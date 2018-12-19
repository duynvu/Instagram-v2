const Photo = require('./PhotoController');
const UserService = require('../services/user');

exports.get = (req, res, next) => {
  res.render("landing");
}

exports.get_register = (req, res, next) => {
  res.render("registration");
}

exports.post_register = async (req, res, next) => {
  var newUser = new User({
      username: req.body.username,
      fullname: req.body.fullname,
      image:    req.body.image
  });
  try {
    const user = await UserService.registerUser(newUser, password);
    passport.authenticate("local")(req, res, function(){
       req.flash("success", "Welcome to Instagram " + user.username);
       res.redirect("/photos");
    });
  } catch(e) {
    req.flash("err", err.message);
    return res.render("registration");
  }
}

exports.get_login = (req, res, next) => {
  res.render("login");
}

exports.post_login = (req, res, next) => {
  res.flash("success", "Welcome to Instagram" + user.username);
}

exports.get_logout = (req, res, next) => {
  req.logout();
  req.flash("success","Logged you out!");
  req.redirect("/");
}
