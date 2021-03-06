app.config(function ($stateProvider) {

	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'views/login/login.html',
		controller: 'LoginCtrl'
	});

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

	$scope.login = {};
	$scope.error = null;

	$scope.sendLogin = function (loginInfo) {
		$scope.error = null;
		AuthService.login(loginInfo)
			.then(function (user) {
				console.log('going to login state');
				if (user.newPass) {
					console.log('redirecting to resetPassword');
					$state.go('resetPass', {'userId': user._id});
				} else {
					$state.go('home');
				}
			}).catch(function () {
				$scope.error = 'Invalid login credentials.';
			});

	};

});
