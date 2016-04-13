'use strict';
var router = require('express').Router();
var http = require('http');
module.exports = router;

router.get('/users/:userId/playlists/', function(req,res){
	
	res.json(['playlist 1', 'playlist 2']);
});
