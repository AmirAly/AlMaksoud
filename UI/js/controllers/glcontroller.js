almaksoud.controller("GlController", function ($scope, $rootScope, API) {
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
if (!($scope.userPermissions.indexOf('accounts') > -1)) {
                $scope.hideCreateBtn=true;
};
if (!($scope.userPermissions.indexOf('searchEditDeals') > -1)) {
                window.location.href='#/dashboard';
};


//loader
$scope.loading = true ; 



$scope.entryArray = [];
var flag = 0 ;

$scope.editEntry=function(entry){
console.log(entry);
localStorage.setItem("currentEntry", JSON.stringify(entry));
window.location.href='#/editentry';
}



//Default Col
$scope.nameCoulmn = true;
$scope.dateCoulmn= true;
$scope.creditCoulmn= true;
$scope.debitCoulmn= true;
$scope.typeCoulmn= true;
$scope.accountCoulmn= true;
$scope.clientCustomerSupplierCoulmn= true;
$scope.personTypeCoulmn= true;
$scope.companyCoulmn= true;
//Selected Col
$scope.toogleCoulmn=function(){
console.log($scope.selectedCoulmn);
if ($scope.selectedCoulmn == 1) {
    if ($scope.nameCoulmn == true)
       $scope.nameCoulmn=false;
    else $scope.nameCoulmn = true;
}
if ($scope.selectedCoulmn == 2) {
    if ($scope.dateCoulmn == true)
       $scope.dateCoulmn=false;
    else $scope.dateCoulmn = true;
}
if ($scope.selectedCoulmn == 3) {
    if ($scope.creditCoulmn == true)
       $scope.creditCoulmn=false;
    else $scope.creditCoulmn = true;
}
if ($scope.selectedCoulmn == 4) {
    if ($scope.debitCoulmn == true)
       $scope.debitCoulmn=false;
    else $scope.debitCoulmn = true;
}
if ($scope.selectedCoulmn == 5) {
    if ($scope.typeCoulmn == true)
       $scope.typeCoulmn=false;
    else $scope.typeCoulmn = true;
}
if ($scope.selectedCoulmn == 6) {
    if ($scope.accountCoulmn == true)
       $scope.accountCoulmn=false;
    else $scope.accountCoulmn = true;
}
if ($scope.selectedCoulmn == 7) {
    if ($scope.masterAccountCoulmn == true)
       $scope.masterAccountCoulmn=false;
    else $scope.masterAccountCoulmn = true;
}
if ($scope.selectedCoulmn == 8) {
    if ($scope.subAccount1Coulmn == true)
       $scope.subAccount1Coulmn=false;
    else $scope.subAccount1Coulmn = true;
}
if ($scope.selectedCoulmn == 9) {
    if ($scope.subAccount2Coulmn == true)
       $scope.subAccount2Coulmn=false;
    else $scope.subAccount2Coulmn = true;
}
if ($scope.selectedCoulmn == 10) {
    if ($scope.subAccount3Coulmn == true)
       $scope.subAccount3Coulmn=false;
    else $scope.subAccount3Coulmn = true;
}
if ($scope.selectedCoulmn == 11) {
    if ($scope.companyCoulmn == true)
       $scope.companyCoulmn=false;
    else $scope.companyCoulmn = true;
}
if ($scope.selectedCoulmn == 12) {
    if ($scope.siteCoulmn == true)
       $scope.siteCoulmn=false;
    else $scope.siteCoulmn = true;
}
if ($scope.selectedCoulmn == 13) {
    if ($scope.clientCustomerSupplierCoulmn == true)
       $scope.clientCustomerSupplierCoulmn=false;
    else $scope.clientCustomerSupplierCoulmn = true;
}
if ($scope.selectedCoulmn == 14) {
    if ($scope.personTypeCoulmn == true)
       $scope.personTypeCoulmn=false;
    else $scope.personTypeCoulmn = true;
}
if ($scope.selectedCoulmn == 15) {
    if ($scope.statementCoulmn == true)
       $scope.statementCoulmn=false;
    else $scope.statementCoulmn = true;
}
if ($scope.selectedCoulmn == 16) {
    if ($scope.addressCoulmn == true)
       $scope.addressCoulmn=false;
    else $scope.addressCoulmn = true;
}
if ($scope.selectedCoulmn == 17) {
    if ($scope.mobileCoulmn == true)
       $scope.mobileCoulmn=false;
    else $scope.mobileCoulmn = true;
}
if ($scope.selectedCoulmn == 18) {
    if ($scope.outgoingsCoulmn == true)
       $scope.outgoingsCoulmn=false;
    else $scope.outgoingsCoulmn = true;
}
$scope.selectedCoulmn = 0;
}







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
            url: 'api/GL/GetLatest/'+ Page,
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


// $scope.deleteEntry=function(){

//             console.log('yes ' + $scope.deleteId);
//             var req = {
//                 method: 'PATCH',
//                 url: 'api/Users/Delete/' + $scope.deleteId,
//                 data: {}
//             }
//             //loade
//             $scope.loading = false ; 
//             $scope.onSubmit = function(){
//               $scope.loading = true ; 
//             }
//             API.execute(req, false).then(function (_res) {
//                 var data = JSON.parse(_res.data);
//                 console.log(data);
//                 $.loader("close");
//                 if (data.Code == 100) {
//                     console.log('pass');
//                     $scope.deleteId='';
//                     $('#deleteModal').modal('hide');
//                     $scope.loadUsers();
//                 }
//                 else {
//                     console.log('fail');
//                 }
//             });
// }
// $scope.closeDeleteModal=function(){
//     $scope.deleteId='';
//     $('#deleteModal').modal('hide');
// }  


});