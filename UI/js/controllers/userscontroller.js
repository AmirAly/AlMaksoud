almaksoud.controller("UsersController", function ($scope, $rootScope, API) {
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

$scope.userPermissions = localStorage.getItem("permissions");
console.log($scope.userPermissions);

if (!($scope.userPermissions.indexOf('users') > -1)) {
                window.location.href='#/dashboard';
            };



// //loader
$scope.loading = true ;


$scope.loadUsers = function () {
        var req = {
            method: 'get',
            url: 'api/Users/GetAll',
            data: {}
        }

        API.execute(req, false).then(function (_res) {
            var data = JSON.parse(_res.data);
            console.log(data);
            $scope.loading = false ;
            if (data.Code == 100) {

                console.log('success');
                $scope.usersArray = data.Data;
            }
            else {
                console.log('fail');
            }
        });
    }
    
$scope.loadUsers();



$scope.saveForm = function (form) {
        angular.forEach($scope.frmCreateUser.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = false ; 
            $scope.onSubmit = function(){
              $scope.loading = true ; 
            }


            var Permissions = "";
            for (var i = 0; i < (document.querySelectorAll('input[name=mycheckboxes]:checked')).length ; i++) {
                var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked')[i].defaultValue;
                Permissions += checkedBoxes + ",";
            }

            var userid = $scope.ModalUserId;
            console.log(userid);

            if (userid) {
                //edit user
                var req = {
                    method: 'POST',
                    url: 'api/Users/Edit',
                    data: {
                        Email: $scope.email,
                        DisplayName: $scope.displayName,
                        Password: $scope.password,
                        Id: $scope.ModalUserId,
                        Permissions: Permissions
                    }
                }
                API.execute(req, false).then(function (_res) {
                    console.log(_res.data);
                    var data = JSON.parse(_res.data);
                    console.log(data);
                    $scope.loading = false ;
                    //$.loader("close");
                    if (data.Code == 100) {
                        console.log('pass');
                        $scope.loadUsers();
                        $scope.email = "";
                        $scope.displayName = "";
                        $scope.password = "";
                        $scope.ModalUserId = "";
                        document.getElementById("accounts").checked = false;
                        document.getElementById("users").checked = false;
                        document.getElementById("searchEditDeals").checked = false;
                        document.getElementById("supplier").checked = false;
                        document.getElementById("searchEditSuppliers").checked = false;
                        $('#myModal').modal('hide');
                    }
                    else {
                        console.log('fail');
                    }
                });


            }
            else {
                // create user
                var req = {
                    method: 'POST',
                    url: 'api/Users/Create',
                    data: {
                        Email: $scope.email,
                        DisplayName: $scope.displayName,
                        Password: $scope.password,
                        Id: $scope.ModalUserId,
                        Permissions: Permissions
                    }
                }
                API.execute(req, false).then(function (_res) {
                    console.log(_res.data);
                    var data = JSON.parse(_res.data);
                    console.log(data);
                    $scope.loading = false ;
                    //$.loader("close");
                    if (data.Code == 100) {
                        console.log('pass');
                        $scope.loadUsers();
                        $scope.email = "";
                        $scope.displayName = "";
                        $scope.password = "";
                        $scope.ModalUserId = "";
                        document.getElementById("accounts").checked = false;
                        document.getElementById("users").checked = false;
                        document.getElementById("searchEditDeals").checked = false;
                        document.getElementById("supplier").checked = false;
                        document.getElementById("searchEditSuppliers").checked = false;
                        $('#myModal').modal('hide');
                    }
                    else {
                        console.log('fail');
                    }
                });


            }
        }
}

$scope.openEditModal = function (_userId) {
        console.log(_userId);

        for (var i = 0; i < $scope.usersArray.length; i++) {
            if ($scope.usersArray[i].Id === _userId) {
                var thisUser = $scope.usersArray[i];
            }
        }
        console.log(thisUser);

        $scope.email = thisUser.Email;
        $scope.displayName = thisUser.DisplayName;
        $scope.password = thisUser.Password;
        $scope.ModalUserId = thisUser.Id;
        
        console.log(thisUser.Permissions);
        if ((thisUser.Permissions) != null) {

            if (thisUser.Permissions.indexOf('accounts') > -1) {
                document.getElementById("accounts").checked = true;
            };
            if (thisUser.Permissions.indexOf('users') > -1) {
                document.getElementById("users").checked = true;
            };
            if (thisUser.Permissions.indexOf('searchEditDeals') > -1) {
                document.getElementById("searchEditDeals").checked = true;
            };
            if (thisUser.Permissions.indexOf('supplier') > -1) {
                document.getElementById("supplier").checked = true;
            };
            if (thisUser.Permissions.indexOf('searchEditSuppliers') > -1) {
                document.getElementById("searchEditSuppliers").checked = true;
            };
        }
        $('#myModal').modal('show');
}

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
            //loade
            $scope.loading = false ; 
            $scope.onSubmit = function(){
              $scope.loading = true ; 
            }
            API.execute(req, false).then(function (_res) {
                var data = JSON.parse(_res.data);
                console.log(data);
                $scope.loading = false ;
                //$.loader("close");
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
    // on modal hide
    
$scope.closeModal=function (){
  console.log('hide');
  $scope.email = "";
  $scope.displayName = "";
  $scope.password = "";
  $scope.ModalUserId = "";
  document.getElementById("accounts").checked = false;
  document.getElementById("users").checked = false;
  document.getElementById("searchEditDeals").checked = false; 
  document.getElementById("supplier").checked = false;
  document.getElementById("searchEditSuppliers").checked = false; 
 $('#myModal').modal('hide');
}


$scope.closeDeleteModal=function(){
    //loader
            
              $scope.loadingCancel = true ; 
        
    $scope.deleteId='';
    $('#deleteModal').modal('hide');
    $scope.loadingCancel = false ; 

}

});


