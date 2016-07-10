almaksoud.controller("EditsupplierController", function ($scope, $rootScope, API) {

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

if (!($scope.userPermissions.indexOf('searchEditSuppliers') > -1)) {
                window.location.href='#/dashboard';
};


var retrievedObject =JSON.parse(localStorage.getItem('currentEntry'));
console.log(retrievedObject);




//datePicker
$scope.datePicker=function () {
 $( "#txtDate" ).datepicker();
};
$scope.datePicker();




$scope.getEntry = function(){
      month  = retrievedObject.Month;
      console.log(retrievedObject.Month);
      day  = retrievedObject.Day;
      year   = retrievedObject.Year ;
      $scope.BuyingBy = retrievedObject.OrderBy ;
      $scope.BookKeeper = retrievedObject.By ;
      $scope.Unit = retrievedObject.Unit ;
      $scope.Weight = retrievedObject.Weight ;
      $scope.Quantity = retrievedObject.Qty ;
      $scope.Gender = retrievedObject.Type ;
      $scope.Company = retrievedObject.Company ;
      $scope.Price = retrievedObject.Price ;
      $scope.SupplierName = retrievedObject.Supplier ;
      $scope.Site = retrievedObject.Site ;
      $scope.MainCostCenter = retrievedObject.CostCenter ;
      $scope.SubCostCenter = retrievedObject.CostCenter2 ;
      $scope.Statement = retrievedObject.Statement ;
      // $scope.PaymentStatus = retrievedObject.PaymentStatus ;
      if(retrievedObject.PaymentStatus = 'مسدد')
          $scope.PaymentStatus = true;
     else
        $scope.PaymentStatus = false;
      $scope.NewEntryId=  retrievedObject.NewEntryId; 
      $scope.EntryId = retrievedObject.Id;
      $scope.Date=  retrievedObject.Day +'-' +retrievedObject.Month+ '-' +retrievedObject.Year;
}
$scope.getEntry();


$scope.saveForm = function (form) {
      $scope.Date= $('#txtDate').val();
        angular.forEach($scope.frmEditSupplier.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = false ; 
            $scope.onSubmit = function(){
              $scope.loading = true ; 
            }

            //CheckBox
             var chkPaymentStatus ;
              if($scope.PaymentStatus == true)
                chkPaymentStatus= 'مسدد';
              else
                chkPaymentStatus= 'غير مسدد';
              console.log(chkPaymentStatus);

                var obj={};
                //datePicker;
                var date= $('#txtDate').val();
                console.log(date);
                var elem = date.split('/');  
                month = elem[0];  
                day = elem[1];  
                year = elem[2];
                console.log(day);


                obj.Month= month;
                obj.Day= day ;
                obj.Year= year ;
                obj.Id= $scope.EntryId ;
                obj.OrderBy= $scope.BuyingBy ;
                obj.By= $scope.BookKeeper ;
                obj.Unit= $scope.Unit ;
                obj.Weight= $scope.Weight ;
                obj.Qty= $scope.Quantity ;
                obj.Type= $scope.Gender ;
                obj.Company= $scope.Company ;
                obj.Price= $scope.Price ;
                obj.Supplier= $scope.SupplierName ;
                obj.Site= $scope.Site ;
                obj.CostCenter= $scope.MainCostCenter ;
                obj.CostCenter2= $scope.SubCostCenter ;
                obj.Statement= $scope.Statement ;
                obj.PaymentStatus= chkPaymentStatus ;
                obj.NewEntryId= $scope.NewEntryId;
                obj.TimeStamp = new Date().toISOString();
                console.log(obj);
    
                var req = {
                    method: 'POST',
                    url: 'api/Suppliers/Edit',
                    data: obj
                }
                API.execute(req, false).then(function (_res) {
                    console.log(_res.data.Data);
                    var data = JSON.parse(_res.data.Data);
                    console.log(data);
                    $scope.loading = false ;
                    //$.loader("close");
                    if (_res.data.Code == 100) {
                        console.log('pass');
                        window.location.href="#/supplier"
            

                        
                    }
                    else {
                        console.log('fail');
                    }
                });

        }
};
                

});



almaksoud.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});