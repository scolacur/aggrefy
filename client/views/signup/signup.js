app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'views/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.error = null;

    $scope.sendSignup= function (signupInfo) {
        $scope.error = null;
        AuthService.signup(signupInfo)
        .then(function () {
						console.log('going to home state');
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Email is taken!';
        });

    };

});
