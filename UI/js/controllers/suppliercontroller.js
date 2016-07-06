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



//Default Col
$scope.byCoulmn = true;
$scope.orderByCoulmn= true;
$scope.dateCoulmn= true;
$scope.priceCoulmn= true;
$scope.statementCoulmn= true;
$scope.paymentStatusCoulmn= true;
//Selected Col
$scope.toogleCoulmn=function(){
console.log($scope.selectedCoulmn);
if ($scope.selectedCoulmn == 1) {
    if ($scope.byCoulmn == true)
       $scope.byCoulmn=false;
    else $scope.byCoulmn = true;
}
if ($scope.selectedCoulmn == 2) {
    if ($scope.orderByCoulmn == true)
       $scope.orderByCoulmn=false;
    else $scope.orderByCoulmn = true;
}
if ($scope.selectedCoulmn == 3) {
    if ($scope.dateCoulmn == true)
       $scope.dateCoulmn=false;
    else $scope.dateCoulmn = true;
}
if ($scope.selectedCoulmn == 4) {
    if ($scope.qtyCoulmn == true)
       $scope.qtyCoulmn=false;
    else $scope.qtyCoulmn = true;
}
if ($scope.selectedCoulmn == 5) {
    if ($scope.unitCoulmn == true)
       $scope.unitCoulmn=false;
    else $scope.unitCoulmn = true;
}
if ($scope.selectedCoulmn == 6) {
    if ($scope.weightCoulmn == true)
       $scope.weightCoulmn=false;
    else $scope.weightCoulmn = true;
}
if ($scope.selectedCoulmn == 7) {
    if ($scope.typeCoulmn == true)
       $scope.typeCoulmn=false;
    else $scope.typeCoulmn = true;
}
if ($scope.selectedCoulmn == 8) {
    if ($scope.companyCoulmn == true)
       $scope.companyCoulmn=false;
    else $scope.companyCoulmn = true;
}
if ($scope.selectedCoulmn == 9) {
    if ($scope.priceCoulmn == true)
       $scope.priceCoulmn=false;
    else $scope.priceCoulmn = true;
}
if ($scope.selectedCoulmn == 10) {
    if ($scope.supplierCoulmn == true)
       $scope.supplierCoulmn=false;
    else $scope.supplierCoulmn = true;
}
if ($scope.selectedCoulmn == 11) {
    if ($scope.siteCoulmn == true)
       $scope.siteCoulmn=false;
    else $scope.siteCoulmn = true;
}
if ($scope.selectedCoulmn == 12) {
    if ($scope.costCenterCoulmn == true)
       $scope.costCenterCoulmn=false;
    else $scope.costCenterCoulmn = true;
}
if ($scope.selectedCoulmn == 13) {
    if ($scope.costCenter2Coulmn == true)
       $scope.costCenter2Coulmn=false;
    else $scope.costCenter2Coulmn = true;
}
if ($scope.selectedCoulmn == 14) {
    if ($scope.statementCoulmn == true)
       $scope.statementCoulmn=false;
    else $scope.statementCoulmn = true;
}
if ($scope.selectedCoulmn == 15) {
    if ($scope.paymentStatusCoulmn == true)
       $scope.paymentStatusCoulmn=false;
    else $scope.paymentStatusCoulmn = true;
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