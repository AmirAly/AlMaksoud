almaksoud.controller("LoginController", function ($scope, API) {
    $scope.email = '';
    $scope.password = '';

    $scope.loginForm = function (form) {
        $scope.afterLoginError = '';
        angular.forEach($scope.login.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            var req = {
                method: 'POST',
                url: 'api/Users/Signin',
                data: {
                    Email: $scope.email,
                    Password: $scope.password
                }
            }
            API.execute(req, false).then(function (_res) {
                console.log(_res.data);
                var data = JSON.parse(_res.data);
                console.log(data);
               
                if (data.Code == 100) {
                    console.log('success');
                    // Store
                    localStorage.setItem("username", data.Data.DisplayName);
                    localStorage.setItem("password", data.Data.Password);
                    console.log(data.Data);
                    if ($('#rememberMeCheck').is(':checked')) {
                        console.log('true');
                        localStorage.setItem("remember", 'true');
                    }
                    else {
                        console.log('false');
                        localStorage.setItem("remember", 'false');
                    }
                    console.log(localStorage.getItem("username"));
                    window.location.href = "#/dashboard";
                }
                else {
                    console.log('fail');
                }
            });
        }
    }
});

// local storage update 
//var updatedUser = localstorage.getObject('currentUser');
//updatedUser.FirstName = "eeeeee";
//localstorage.resetObject('currentUser', updatedUser);