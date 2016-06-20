almaksoud.controller("GlController", function ($scope, $rootScope, API) {
    //$scope.text = "gl gl"
    console.log(localStorage.getItem("username"));
    $scope.txtUserName = localStorage.getItem("username");
    if (localStorage.getItem("remember") === "false" && localStorage.getItem("username") === "") {
        window.location.href = "#/";
    }
$scope.hideCreateBtn=false;
$scope.userPermissions = localStorage.getItem("permissions");
console.log($scope.userPermissions);
if (!($scope.userPermissions.indexOf('accounts') > -1)) {
                $scope.hideCreateBtn=true;
};
if (!($scope.userPermissions.indexOf('searchEditDeals') > -1)) {
                window.location.href='#/dashboard';
};


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

$.loader({
   className: "blue-with-image",
   content: ''
});

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
               $.loader("close");
               $scope.entryArray =_res.data;
           }
          else {
            console.log('fail');
           }
        });
}
$scope.loadEntry();  


$scope.openDeleteModal = function (_userId) {
         $scope.deleteId=_userId;
         $('#deleteModal').modal('show');

}


$scope.deleteEntry=function(){

            console.log('yes ' + $scope.deleteId);
            var req = {
                method: 'PATCH',
                url: 'api/Users/Delete/' + $scope.deleteId,
                data: {}
            }
            $.loader({
                className: "blue-with-image",
                content: ''
            });
            API.execute(req, false).then(function (_res) {
                var data = JSON.parse(_res.data);
                console.log(data);
                $.loader("close");
                if (data.Code == 100) {
                    console.log('pass');
                    $scope.deleteId='';
                    $('#deleteModal').modal('hide');
                    $scope.loadUsers();
                }
                else {
                    console.log('fail');
                }
            });
}
$scope.closeDeleteModal=function(){
    $scope.deleteId='';
    $('#deleteModal').modal('hide');
}  


});