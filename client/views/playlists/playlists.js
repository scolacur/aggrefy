app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('playlists', {
        url: '/playlists',
        controller: 'PlaylistsController',
        templateUrl: 'views/playlists/playlists.html'
    });

});

app.controller('PlaylistsController', function ($scope) {

});
