almaksoud.controller("CreatenewsupplierController", function ($scope, $rootScope, API) {

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

if (!($scope.userPermissions.indexOf('supplier') > -1)) {
                window.location.href='#/dashboard';
};



//datePicker
$scope.datePicker=function () {
    $( "#txtDate" ).datepicker();
};
$scope.datePicker();


//default currentDate
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newdate = day + "/" + month + "/" + year;
console.log(newdate);
$scope.Date=newdate;


//default Name
$scope.BookKeeper= localStorage.getItem("username");
console.log($scope.BookKeeper);




$scope.saveForm = function (form) {
    $scope.Date= $('#txtDate').val();
        angular.forEach($scope.frmCreateNewSupplier.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = true ;

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
                console.log(obj.TimeStamp);
                console.log(obj);
               

               var req = {
                    method: 'POST',
                    url: 'api/Suppliers/Create',
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
                        $('#txtDate').val('');
                        month = "";
                        day = "";
                        year = "";
                        $scope.BuyingBy = "";
                        $scope.BookKeeper = "";
                        $scope.Unit = "";
                        $scope.Weight = "";
                        $scope.Quantity = "";
                        $scope.Gender = "";
                        $scope.Company = "";
                        $scope.Price = "";
                        $scope.SupplierName = "";
                        $scope.Site = "";
                        $scope.MainCostCenter = "";
                        $scope.SubCostCenter = "";
                        $scope.Statement = "";
                        $scope.PaymentStatus = "";
                        document.getElementById("txtPaymentStatus").checked = false;
                        $scope.NewEntryId = "";

                    $scope.frmCreateNewSupplier.$setPristine();
                    $scope.frmCreateNewSupplier.$setUntouched()
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