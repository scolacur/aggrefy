'use strict';
var router = require('express').Router();
// var http = require('http');
// var requestify = require('requestify');
var request = require('request');

module.exports = router;

router.get('/playlists', function(req,res){
	var username = req.foundUser.spotify.username;
	var bearerToken = req.foundUser.spotify.accessToken;
	var path = 'https://api.spotify.com/v1/users/' + username + '/playlists';

	console.log('making request to path:');
	console.log('path ', path);
	console.log('with AccessToken:', bearerToken);

	var options = {
		'auth': {
			'bearer': bearerToken
		}
	};

	request.get(path, options, function(error, response, body){

		if (!error && response.statusCode === 200) {
			var info = JSON.parse(body);
			console.log('GOT THE RESPONSE: ', info);
			res.json(info);
		} else if (response && response.statusCode === 401){
			res.status(401).json('Unauthorized!');
		} else {
			res.status(404).json(error);
		}
	});

});
