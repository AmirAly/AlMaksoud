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


//loader
$scope.loading = true ; 



$scope.entryArray = [];
var flag = 0 ;


$scope.editEntry=function(entry){
console.log(entry);
localStorage.setItem("currentEntry", JSON.stringify(entry));
window.location.href='#/editsupplier';
};


var Page = 0;
$(document).scroll(function(){
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 40) {
            $scope.loadEntry();
        } 
});


$scope.loadEntry = function () {
      if(flag == 1)
        return ;
      else
        flag = 1;

        console.log(Page);
        var req = {
            method: 'get',
            url: 'api/Suppliers/GetLatest/'+ Page,
            data: {}
        }
        //mmake the mouse cursor loading
        $('body').addClass('waiting');
        setTimeout(function(){$('body').removeClass('waiting');},5000);
        
        API.execute(req, false).then(function (_res) {
            //var data = JSON.parse(_res.data);
            console.log(_res);
            flag = 0 ;
            if (_res.data.Code = 100) {
               console.log('success');
               $scope.loading = false ; 
               if(_res.data.Data && _res.data.Data!= "No data available")
               {
             $scope.entryArray =  $scope.entryArray.concat(_res.data.Data);
             console.log($scope.entryArray.length);
             Page++;
             //hide
             $('body').removeClass('waiting');
              }
           }
          else {
            //hide
            $('body').removeClass('waiting');
            flag = 0 ;
            Page++;
            console.log('fail');
           }
        });
}
$scope.loadEntry();


$scope.openDeleteModal = function (_userId) {
  $scope.deleteId=_userId;
  $('#deleteModal').modal('show');

}



});