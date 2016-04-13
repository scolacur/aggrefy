app.config(function ($stateProvider) {
    $stateProvider
    .state('resetPass', {
        url: '/reset/:userId',
        templateUrl: 'views/resetPass/resetPass.html',
        controller: 'ResetCtrl'
    });
});

app.controller('ResetCtrl', function ($scope, UserFactory, $stateParams, AuthService, $state) {

    $scope.resetPass = function (newPass) {
        UserFactory.edit($stateParams.userId, {'newPass': false, 'password': newPass})
        .then( function (user) {
            AuthService.login({email: user.email, password: newPass})
            .then(function () {
              $state.go('home');
            });
        })
    }
})
