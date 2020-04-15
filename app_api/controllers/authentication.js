'use strict';
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');
var Mailgun = require('mailgun-js');
var configAuth = require('../config/auth');


var sendJSONrespone = (res, status, content) => {
	res.status(status);
	res.json(content);
};
module.exports.register = (req, res) => {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONrespone(res, 400, {
			"message": "All fields required!"
		});
		return;
	}
	var user = new User();
	user.local.name = req.body.name;
	user.local.email = req.body.email;
	user.setPassword(req.body.password);
	user.save(function (err) {
		var token;
		if (err) {
			sendJSONrespone(res, 400, {
				message: "Email is already exists or another err, please recheck!"
			});
		} else {
			token = user.generateJwt();
			sendJSONrespone(res, 200, {
				"token": token
			});
		}
	});

};
module.exports.login = function (req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONrespone(res, 400, {
			"message": "All fields required!"
		});
		return;
	}
	passport.authenticate('local', function (err, user, info) {
		var token;
		if (err) {
			sendJSONrespone(res, 400, err);
			return;
		}
		if (user) {
			token = user.generateJwt();
			sendJSONrespone(res, 200, {
				"token": token
			});
		} else {
			sendJSONrespone(res, 401, info);
		}

	})(req, res);
};
module.exports.loginGoogle = function (req, res) {
	passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
};
module.exports.loginGoogleCallback = function (req, res) {
	passport.authenticate('google', function (err, user, info) {

		var token;
		if (err) {
			sendJSONrespone(res, 400, err);
			return;
		}
		if (user) {
			token = user.generateJwt();
			res.redirect('/callback/' + token);

		} else {
			sendJSONrespone(res, 401, info);
		}

	})(req, res);
};
module.exports.loginFacebookCallback = function (req, res) {
	passport.authenticate('facebook', function (err, user, info) {
		console.log("User facebook :", user);
		var token;
		if (err) {
			sendJSONrespone(res, 400, err);
			return;
		}
		if (user) {
			token = user.generateJwt();
			res.redirect('/callback/' + token);

		} else {
			sendJSONrespone(res, 401, info);
		}

	})(req, res);
};
module.exports.forgot = (req, res, next) => {
	async.waterfall([
		(done) => {
			crypto.randomBytes(20, (err, buf) => {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		(token, done) => {
			User.findOne({ 'local.email': req.body.email }, (err, user) => {

				if (!user) {
					console.log("fix bug,user:", "Go here!");
					sendJSONrespone(res, 404, {
						"message": "No account with that email address exists."
					});
					return res.redirect('/forgot');
				}
				user.local.resetPasswordToken = token;
				user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour
				user.save((err) => {
					done(err, token, user);
				});
			});
		},
		(token, user, done) => {
			var apiKey = configAuth.mailgun.apiKey;
			var domain = configAuth.mailgun.domain;
			var mailgun = Mailgun({ apiKey: apiKey, domain: domain });
			var mailOptions = {
				to: req.body.email,
				from: 'Admin Loc8r <duythiensl@gmail.com>',
				subject: 'Node.js Password Reset',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};
			mailgun.messages().send(mailOptions, (err, info) => {
				if (err) {
					return console.log(err);
				} else {
					sendJSONrespone(res, 200, {
						"message": "An e-mail has been sent to your mail with further instructions"
					});
					done(err, 'done');
					return info;

				}
			});
		}
	], (err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/forgot');
	});
};
module.exports.resetpassword = function (req, res) {
	async.waterfall([
		function (done) {
			User.findOne({ "local.resetPasswordToken": req.params.token, "local.resetPasswordExpires": { $gt: Date.now() } }, function (err, user) {
				if (!user) {
					sendJSONrespone(res, 400, {
						"message": "Password reset token is invalid or has expired."
					});
					return res.redirect('/reset/' + req.params.token);
				}
				user.setPassword(req.params.password);
				user.local.resetPasswordToken = undefined;
				user.local.resetPasswordExpires = undefined;
				user.save((err) => {
					var token;
					if (err) {
						sendJSONrespone(res, 400, err);
					} else {
						token = user.generateJwt();
						sendJSONrespone(res, 200, {
							"token": token,
							"successMsg": "Success! Your password has been changed."
						});
					}
					done(err, user);
				});
			});
		}, function (user) {

			var apiKey = configAuth.mailgun.apiKey;
			var domain = configAuth.mailgun.domain;
			var mailgun = Mailgun({ apiKey: apiKey, domain: domain });
			var mailOptions = {
				to: user.local.email,
				from: 'Admin Loc8r <duythiensl@gmail.com>',
				subject: 'Node.js Password Reset',
				text: 'Hello,\n\n' +
					'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
			};
			mailgun.messages().send(mailOptions, function (err, info) {
				if (err) {
					return console.log("Respone Error Mailgun:", err);
				} else {
					sendJSONrespone(res, 200, {
						"message": "Success! Your password has been changed."
					});
					return info;
				}
			});
		}
	], function (err) {
		res.redirect('/');
		return err;
	});
};