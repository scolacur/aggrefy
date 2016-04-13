app.factory('spotifyService', spotifyService);

function spotifyService($http){
	var service = {
		getPlaylists: getPlaylists
	};
	return service;

	function getPlaylists(userId){
		console.log('in factory, getting playlists');
		return $http.get('/api/spotify/users/' + userId + '/playlists')
		.then(success)
		.catch(fail);

		function success(response){
			console.log('in factory with playlists', response.data);
			return response.data;
		}

		function fail(e){
			console.error(e);
			return e;
		}


	}
}
