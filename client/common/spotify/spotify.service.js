app.factory('spotifyService', spotifyService);

function spotifyService($http, AuthService){
	var service = {
		getPlaylists: getPlaylists
	};
	return service;

	function getPlaylists(){

		return AuthService.getLoggedInUser()
		.then(function (user) {
			// console.log('USER: ',user);
			var path = '/api/users/' + user._id + '/spotify/playlists';
			// console.log('in factory, getting playlists at path: ');
			// console.log(path)
			return $http.get(path);
		})
		.then(success)
		.catch(fail);


		function success(response){
			console.log('in factory with playlists', response.data);
			return response.data.items;
		}

		function fail(e){
			console.error(e);
			return e;
		}


	}
}
