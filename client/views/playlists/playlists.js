app.config(function ($stateProvider) {

	// Register our *about* state.
	$stateProvider.state('playlists', {
		url: '/:userId/playlists',
		controller: 'PlaylistsController',
		templateUrl: 'views/playlists/playlists.html',
		resolve: {
			spotifyPlaylists: function ($stateParams, spotifyService) {
				var userId = $stateParams.userId;
				console.log('Getting playlists for user:', userId);
				return spotifyService.getPlaylists();
			}
		}
	});
});

app.controller('PlaylistsController', function ($scope, spotifyPlaylists) {
	$scope.playlists = spotifyPlaylists;
	console.log('controller loaded', $scope.playlists);

});
