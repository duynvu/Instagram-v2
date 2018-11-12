var express     = require("express"),
    app         = express();
//     bodyParser  = require("body-parser"),
//     mongoose    = require("mongoose"),
//     flash       = require("connect-flash"),
//     passport    = require("passport"),
//     LocalStrategy = require("passport-local"),
//     Photo       = require("./models/photo"),
//     Comment     = require("./models/comment")
//     User      	= require("./models/user"),
//     methodOverride = require("method-override");


// mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
// app.use(bodyParser.urlencoded({extended: true}));
// app.set("view engine", "ejs");
// app.use(express.static(__dirname + "/public"));
// app.use(methodOverride("_method"));
// app.use(flash());

// // PASSPORT CONFIGURATION
// app.use(require("express-session")({
// 	secret: "",
// 	resave: false,
// 	saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
    res.send("ok");
})

app.listen(3000, () => {
    console.log("Server is listening");
})