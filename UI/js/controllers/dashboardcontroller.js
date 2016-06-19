almaksoud.controller("DashboardController", function ($scope, $rootScope, API) {
    console.log(localStorage.getItem("username"));
    $scope.txtUserName = localStorage.getItem("username");
    if (localStorage.getItem("remember") === "false" && localStorage.getItem("username") === "") {
        window.location.href = "#/";
    }

$scope.userPermissions = localStorage.getItem("permissions");
console.log($scope.userPermissions);

$scope.accountsCard=false;
$scope.usersCard=false;

 if (($scope.userPermissions) != null) {

            if ($scope.userPermissions.indexOf('accounts') > -1) {
                $scope.accountsCard=true;
                $scope.accountsCardRedirectLink='#/createnewentry';
            };
            if ($scope.userPermissions.indexOf('users') > -1) {
                $scope.usersCard=true;
            };
            if ($scope.userPermissions.indexOf('searchEditDeals') > -1) {
                $scope.accountsCard=true;
                $scope.accountsCardRedirectLink='#/gl';
            };
        }




    $scope.logout = function () {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
        localStorage.setItem("remember", 'false');
        window.location.href = "#/";
    }
});
