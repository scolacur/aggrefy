'use strict';

var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

	var spotifyConfig = app.getValue('env').SPOTIFY;

	var spotifyCredentials = {
		clientID: spotifyConfig.clientID,
		clientSecret: spotifyConfig.clientSecret,
		callbackURL: spotifyConfig.callbackURL
	};

	var verifyCallback = function (accessToken, refreshToken, profile, done) {
		console.log(profile);
		console.log('ACCESS TOKEN: ', accessToken);
		UserModel.findOne({ 'spotify.username': profile.id }).exec()
		.then(function (user) {
			if (user) {
				return user;
			} else {
				return UserModel.create({
					spotify: {
						username: profile.id,
						accessToken: accessToken,
						refreshToken: refreshToken
					},
					email: profile.emails[0].value
				});
			}
		}).then(function (userToLogin) {
			console.log(userToLogin);
			done(null, userToLogin);
		}, function (err) {
			console.error('Error creating user from Spotify authentication', err);
			done(err);
		});
	};

	passport.use(new SpotifyStrategy(spotifyCredentials, verifyCallback));

	app.get('/auth/spotify', passport.authenticate('spotify', {
		scope: [
			'user-read-email',
			'user-read-private',
			'playlist-read-private',
			'playlist-read-collaborative'
		]
	}));

	app.get('/auth/spotify/callback',
		passport.authenticate('spotify', {failureRedirect: '/login' }), function (req, res) {
			res.redirect('/');
		});
};
