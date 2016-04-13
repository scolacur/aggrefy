app.directive('oauthButton', function () {
	return {
		scope: {
			providerName: '@'
		},
		restrict: 'E',
		templateUrl: '/common/oauth-button/oauth-button.html',
		controller: 'LoginCtrl'
	};
});
