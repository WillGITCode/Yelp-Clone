var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    User = require("./models/user");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/users");

//new method using enviroment variable
var url = process.env.DATABASEURL || 'mongodb://127.0.0.1:27017/v13';
mongoose.connect(url);

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());

// Passport Config
app.use(require("express-session")({
    secret: "One To Rule Them All!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware function
//passes user info between routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/users", userRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp Server has started");
});
