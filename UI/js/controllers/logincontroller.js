almaksoud.controller("LoginController", function ($scope, API) {
    $scope.email = '';
    $scope.password = '';
    $scope.afterLoginError = false;

if (localStorage.getItem("username")) {
    window.location.href='#/dashboard';
}
    $scope.loginForm = function (form) {
        $scope.afterLoginError = false;
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
            //loader
            $scope.loading = false ; 
            $scope.onSubmit = function(){
              $scope.loading = true ; 
            }
            
            API.execute(req, false).then(function (_res) {
                console.log(_res.data);
                var data = JSON.parse(_res.data);
                console.log(data);
                //$.loader("close");

                if (data.Code == 100) {
                    console.log('success');
                    // Store
                    localStorage.setItem("username", data.Data.DisplayName)
                    localStorage.setItem("password", data.Data.Password);
                    localStorage.setItem("permissions", data.Data.Permissions);
                    console.log(data.Data.Permissions);
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
                    // get lookups data
            var req = {
                method: 'Get',
                url: 'api/Lookups/All/All',
                data: {}
            }                        
            API.execute(req, false).then(function (_res) {
                console.log(_res.data);
                if (_res.data.Code == 100) {
                   $scope.loading = false ;
                    console.log('success');
                    localStorage.setItem("lookUps",JSON.stringify(_res.data.Data));
                    console.log(JSON.parse(localStorage.getItem("lookUps")));
                   window.location.href = "#/dashboard";

                }
                else {
                    console.log('fail');
                }
            });

                }
                else {
                    console.log('fail');
                    $scope.afterLoginError= true;
                }
            });
        }
    }
});