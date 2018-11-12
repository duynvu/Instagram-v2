var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");

// Routes
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var photoRouter = require("./routes/photos");
var commentRouter = require("./routes/comments");
var likeRouter = require("./routes/likes");
var followRouter = require("./routes/follows");
var exploreRouter = require("./routes/explore");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

