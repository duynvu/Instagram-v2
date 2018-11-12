var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Photo       = require("./models/photo"),
    Comment     = require("./models/comment")
    User      	= require("./models/user"),
    methodOverride = require("method-override");


mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());








// Routes
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var photoRouter = require("./routes/photos");
var commentRouter = require("./routes/comments");
var likeRouter = require("./routes/likes");
var followRouter = require("./routes/follows");
var exploreRouter = require("./routes/explore");
