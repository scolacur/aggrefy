app.config(function($stateProvider){
	$stateProvider
	.state('user', {
		url: '/user/:userId',
		templateUrl: '/views/user/user.html',
		controller: function ($scope, findUser) {
			console.log('loading user controller');
			$scope.user = findUser;
		},
		resolve: {
			findUser: function ($stateParams, UserFactory) {
				return UserFactory.getById($stateParams.userId)
				.then(function(user){
					return user;
				});
			}
		}
	});
});
