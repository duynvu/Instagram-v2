var express     = require("express"),
    app         = express();
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Photo       = require("./models/photo"),
    // Comment     = require("./models/comment")
    User        = require("./models/user"),
    methodOverride = require("method-override");

//requring routes
var indexRoutes      = require("./routes/index");



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



app.use(function(req, res, next){
    //res.locals.currentUser = req.user;
    res.locals.error   = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});

app.get("/photos",function(req,res){
    res.render("index")
})


app.use("/", indexRoutes);

app.listen(3000, () => {
    console.log("Server is listening");
})