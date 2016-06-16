almaksoud.controller("DashboardController", function ($scope, $rootScope, API) {
    console.log(localStorage.getItem("username"));
    $scope.txtUserName = localStorage.getItem("username");
    if (localStorage.getItem("remember") === "false" && localStorage.getItem("username") === "") {
        window.location.href = "#/";
    }

    $scope.logout = function () {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
        localStorage.setItem("remember", 'false');
        window.location.href = "#/";
    }
});
