var mongoose = require('mongoose');
//define a schema for reviews
var reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    createdOn: { type: Date, "default": Date.now }
});

//define a schema for opening times
var openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});
//start main location schema definition
var locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    //define a map location, Use 2dsphere to add support for GeoJson longitude and latitude
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    //reference opening times and reviews schemas to add nested subdocuments
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});
mongoose.model('Location', locationSchema);