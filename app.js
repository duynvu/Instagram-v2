var express     = require("express"),
    app         = express();
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    // Photo       = require("./models/photo"),
    // Comment     = require("./models/comment")
    User      	= require("./models/user"),
    methodOverride = require("method-override");


mongoose.connect("mongodb://localhost/instagram-v2", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Authenticate is importane",
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
    res.send("ok");
})

app.use(function(req, res, next){
    //res.locals.currentUser = req.user;
    res.locals.error   = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});

app.get("/photos",function(req,res){
    res.render("index")
})



//AUTH ROUTES

// show register form
app.get("/register",function(req,res){
    res.render("registration");
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("registration");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to Instagram" + user.username);
           res.redirect("/photos"); 
        });
    });
});

//show login form
app.get("/login",function(req,res){
    res.render("login");
});
// handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/photos",
        failureRedirect: "/login"
    }), function(req,res){
});

//logout route
// app.get("/logout",function(req,res){
//     req.logout();
//     req.flash("success","Logged you out!");
//     res.redirect("/photos");
// })

//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

app.listen(3000, () => {
    console.log("Server is listening");
})