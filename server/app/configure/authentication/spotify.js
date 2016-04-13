'use strict';

var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var spotifyConfig = app.getValue('env').GOOGLE;

    var spotifyCredentials = {
        clientID: spotifyConfig.clientID,
        clientSecret: spotifyConfig.clientSecret,
        callbackURL: spotifyConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {

        UserModel.findOne({ 'spotifyId': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                    return UserModel.create({
                        spotify: {
                            id: profile.id,
                        },
												email: profile.emails[0].value
                    });
                }
            }).then(function (userToLogin) {
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
					'user-read-private'
        ]
    }), function(){});

    app.get('/auth/spotify/callback',
        passport.authenticate('spotify', {failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });
};
