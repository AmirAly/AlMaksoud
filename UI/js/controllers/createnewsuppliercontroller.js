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


$scope.saveForm = function (form) {
        angular.forEach($scope.frmCreateNewSupplier.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = true ; 
                            
                var obj={};
                //obj.Id= $scope.index ;
                //obj.TimeStamp= $scope.index ;
                obj.OrderBy= $scope.BuyingBy ;
                obj.Month= $scope.Month ;
                obj.Day= $scope.Day ;
                obj.By= $scope.BookKeeper ;
                obj.Unit= $scope.Unit ;
                obj.Weight= $scope.Weight ;
                obj.Year= $scope.Year ;
                obj.Qty= $scope.Quantity ;
                obj.Type= $scope.Gender ;
                obj.Company= $scope.Company ;
                obj.Price= $scope.Price ;
                obj.Supplier= $scope.SupplierName ;
                obj.Site= $scope.Site ;
                obj.CostCenter= $scope.MainCostCenter ;
                obj.CostCenter2= $scope.SubCostCenter ;
                obj.Statement= $scope.Statement ;
                obj.PaymentStatus= $scope.PaymentStatus ;
                obj.NewEntryId= $scope.NewEntryId;
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
                        $scope.BuyingBy = "";
                        $scope.Month = "";
                        $scope.Day = "";
                        $scope.BookKeeper = "";
                        $scope.Unit = "";
                        $scope.Weight = "";
                        $scope.Year = "";
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