var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [{
        name: "Camp Camp",
        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1050&q=80",
        description: "Egestas diam in arcu cursus euismod. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Purus in mollis nunc sed id semper risus. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Volutpat odio facilisis mauris sit amet massa vitae. Orci eu lobortis elementum nibh tellus molestie nunc. Non blandit massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet risus feugiat in ante metus dictum at tempor commodo. Posuere urna nec tincidunt praesent semper feugiat nibh. Nunc aliquet bibendum enim facilisis gravida. Faucibus vitae aliquet nec ullamcorper. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices."
    },

    {
        name: "Rocky Camp",
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1050&q=80",
        description: "Egestas diam in arcu cursus euismod. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Purus in mollis nunc sed id semper risus. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Volutpat odio facilisis mauris sit amet massa vitae. Orci eu lobortis elementum nibh tellus molestie nunc. Non blandit massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet risus feugiat in ante metus dictum at tempor commodo. Posuere urna nec tincidunt praesent semper feugiat nibh. Nunc aliquet bibendum enim facilisis gravida. Faucibus vitae aliquet nec ullamcorper. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices."
    },

    {
        name: "Stary Camp",
        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=649&q=80",
        description: "Egestas diam in arcu cursus euismod. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Purus in mollis nunc sed id semper risus. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Volutpat odio facilisis mauris sit amet massa vitae. Orci eu lobortis elementum nibh tellus molestie nunc. Non blandit massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet risus feugiat in ante metus dictum at tempor commodo. Posuere urna nec tincidunt praesent semper feugiat nibh. Nunc aliquet bibendum enim facilisis gravida. Faucibus vitae aliquet nec ullamcorper. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices."
    },

    {
        name: "Super Camp",
        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?auto=format&fit=crop&w=1050&q=80",
        description: "Egestas diam in arcu cursus euismod. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Purus in mollis nunc sed id semper risus. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu. Volutpat odio facilisis mauris sit amet massa vitae. Orci eu lobortis elementum nibh tellus molestie nunc. Non blandit massa enim nec dui nunc mattis. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet risus feugiat in ante metus dictum at tempor commodo. Posuere urna nec tincidunt praesent semper feugiat nibh. Nunc aliquet bibendum enim facilisis gravida. Faucibus vitae aliquet nec ullamcorper. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices."
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds");

        // Add some campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added new campground");
                    // Create Comment
                    Comment.create({
                        text: "I like this place, very chill!",
                        author: "Homer"
                    }, function(err, comment) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created Comment");
                        }
                    });
                }
            });
        });
    });



    // Add some comments
}

module.exports = seedDB;
