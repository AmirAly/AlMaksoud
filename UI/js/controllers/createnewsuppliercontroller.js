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
                obj.Date= $scope.BuyingBy ;
                obj.Month= $scope.Month ;
                obj.Day= $scope.Day ;
                obj.By= $scope.BookKeeper ;
                obj.Credit= $scope.Unit ;
                obj.Debit= $scope.Weight ;
                obj.Year= $scope.Year ; 
                obj.MasterAccount= $scope.MainCostCenter ; 
                obj.Account= $scope.SubCostCenter ; 
                obj.Type= $scope.Gender ; 
                obj.SubAccount3= $scope.SubFinancials3 ;
                obj.SubAccount2= $scope.SubFinancials2 ; 
                obj.SubAccount1= $scope.Price ; 
                obj.ClientCustomerSupplier= $scope.SuppliersOrCustomersOremployees ;
                obj.Site= $scope.Site ; 
                obj.Company= $scope.Company ; 
                obj.Adress= $scope.Adress ; 
                obj.Statement= $scope.Statement ;
                obj.PersonType= $scope.SupplierName ;
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
                        $scope.Month = "";
                        $scope.Day = "";
                        $scope.BookKeeper = "";
                        $scope.Unit = "";
                        $scope.Weight = "";
                        $scope.Year = ""; 
                        $scope.MainCostCenter = ""; 
                        $scope.SubCostCenter = ""; 
                        $scope.Gender = ""; 
                        $scope.SubFinancials3 = "";
                        $scope.SubFinancials2 = ""; 
                        $scope.Price = ""; 
                        $scope.SuppliersOrCustomersOremployees = "";
                        $scope.Site = ""; 
                        $scope.Company = ""; 
                        $scope.Adress = ""; 
                        $scope.Statement = "";
                        $scope.SupplierName = "";
                        $scope.BuyingBy = "";
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