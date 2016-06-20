almaksoud.controller("SupplierController", function ($scope, $rootScope, API) {

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

$scope.hideCreateBtn=false;
$scope.userPermissions = localStorage.getItem("permissions");
console.log($scope.userPermissions);
if (!($scope.userPermissions.indexOf('supplier') > -1)) {
                $scope.hideCreateBtn=true;
};
if (!($scope.userPermissions.indexOf('searchEditSuppliers') > -1)) {
                window.location.href='#/dashboard';
};

$scope.editEntry=function(entry){
        localStorage.setItem("currentEntry", entry);
        window.location.href='#/editsupplier';
}

$.loader({
   className: "blue-with-image",
   content: ''
});

$scope.loadEntry = function () {
        var req = {
            method: 'get',
            url: 'api/Suppliers/GetLatest',
            data: {}
        }
        API.execute(req, false).then(function (_res) {
            //var data = JSON.parse(_res.data);
            if (_res.data != null) {
               console.log('success');
               $.loader("close");
               $scope.entryArray =_res.data;
           }
          else {
            console.log('fail');
           }
        });
}
$scope.loadEntry();



});