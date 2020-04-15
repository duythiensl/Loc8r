'use strict';
var express = require('express');
var cors = require('cors');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    requestProperty: 'payload'

});
var passport = require('passport');
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');
// locations
router.get('/locations/near', ctrlLocations.locationsListByDistance);
router.get('/locations', ctrlLocations.locationsList);
router.post('/locations', ctrlLocations.locationsCreate);
router.get('/locations/:locationid', ctrlLocations.locationsReadOne);
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);
// reviews
router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);
//authiencation
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/auth/google', passport.authenticate('facebook'));
router.get('/auth/google/callback', ctrlAuth.loginGoogleCallback);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', ctrlAuth.loginFacebookCallback);
router.post('/forgot', ctrlAuth.forgot);
router.post('/reset/:token/:password', ctrlAuth.resetpassword);

module.exports = router;


