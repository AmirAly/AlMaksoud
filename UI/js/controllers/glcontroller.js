almaksoud.controller("GlController", function ($scope, $rootScope, API) {
    $scope.text = "gl gl"
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
$scope.editEntry=function(entry){
        localStorage.setItem("currentEntry", entry);
        window.location.href='#/editentry';
}
    $scope.loadEntry = function () {
        var req = {
            method: 'get',
            url: 'api/GL/GetLatest',
            data: {}
        }
        API.execute(req, false).then(function (_res) {
            //var data = JSON.parse(_res.data);
            if (_res.data != null) {
               console.log('success');
               $scope.entryArray =_res.data;
           }
          else {
            console.log('fail');
           }
        });
    }
    $scope.loadEntry();    
});