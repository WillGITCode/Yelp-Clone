var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

// Idex
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// Post new campground route
router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var price = req.body.price;

    geocoder.geocode(req.body.location, function(err, data) {
        if (err) {
            req.flash("error", "Problem loading Google Maps!");
            res.redirect("back");
        }
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = { name: name, image: image, description: desc, price: price, author: author, location: location, lat: lat, lng: lng };
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            }
            else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
});

//new campground route
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Show - shows more info about one camp
router.get("/:id", function(req, res) {
    //find camp with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "Campground not found!");
            res.redirect("back");
        }
        else {
            //render show template
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            req.flash("error", "You can only edit your own Campgrounds!");
        }
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

//post edited campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    geocoder.geocode(req.body.campground.location, function(err, data) {
        if (err) {
            req.flash("error", "Problem with Google maps" + err);
            res.redirect("back");
        }
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = { name: req.body.campground.name, image: req.body.campground.image, description: req.body.campground.description, price: req.body.campground.price, location: location, lat: lat, lng: lng };
        Campground.findByIdAndUpdate(req.params.id, { $set: newData }, function(err, campground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            }
            else {
                req.flash("success", "Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});

// Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", err);
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
