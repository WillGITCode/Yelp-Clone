var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware");


//User Show
router.get("/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err || !foundUser) {
            req.flash("error", "User not found");
            return res.redirect("/");
        }
        Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds) {
            if (err) {
                req.flash("error", "Something went wrong");
                return res.redirect("/");
            }
            res.render("users/show", { user: foundUser, campgrounds: campgrounds });
        });
    });
});

// Edit User Route
router.get("/:id/edit", middleware.checkUserOwnership, function(req, res) {
    console.log("about to render edit");
    User.findById(req.params.id, function(err, foundUser) {
        if (err || !foundUser) {
            req.flash("error", "You can only edit your own Profile!");
            return res.redirect("/");
        }

        res.render("users/edit", { foundUser: foundUser });
    });
});


//User Update Route
router.put("/:id", middleware.checkUserOwnership, function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
        if (err) {
            req.flash("error", "Sorry, Something went Wrong!");
            res.redirect("back");
        }
        else {
            res.redirect("/users/" + req.params.id);
        }
    });
});


// User Destroy Route
router.delete("/:id", middleware.isAdmin, function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            req.flash("error", "Sorry, Something went Wrong!");
            res.redirect("back");
        }
        else {
            req.flash("success", "User deleted!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;
