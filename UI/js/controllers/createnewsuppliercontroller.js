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
            $scope.loading = false ; 
            $scope.onSubmit = function(){
              $scope.loading = true ; 
            }
                
                var obj={};
                //obj.Id= $scope.index ;
                //obj.TimeStamp= $scope.index ;
                //obj.Date= $scope.index ;
                obj.Month= $scope.Month ;
                obj.Day= $scope.Day ;
                obj.By= $scope.Name ;
                obj.Credit= $scope.Creditor ;
                obj.Debit= $scope.Debtor ;
                obj.Year= $scope.Year ; 
                obj.MasterAccount= $scope.MainFinancials ; 
                obj.Account= $scope.Financials ; 
                obj.Type= $scope.CreditorOrDebtor ; 
                obj.SubAccount3= $scope.SubFinancials3 ;
                obj.SubAccount2= $scope.SubFinancials2 ; 
                obj.SubAccount1= $scope.SubFinancials1 ; 
                obj.ClientCustomerSupplier= $scope.SuppliersOrCustomersOremployees ;
                obj.Site= $scope.Site ; 
                obj.Company= $scope.Company ; 
                obj.Adress= $scope.Adress ; 
                obj.Statement= $scope.Statement ;
                obj.PersonType= $scope.Gender ; 
                obj.Outgoings= $scope.Outgoings ; 
                obj.Mobile= $scope.Mobile ; 
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
                        $scope.Name = "";
                        $scope.Creditor = "";
                        $scope.Debtor = "";
                        $scope.Year = ""; 
                        $scope.MainFinancials = ""; 
                        $scope.Financials = ""; 
                        $scope.CreditorOrDebtor = ""; 
                        $scope.SubFinancials3 = "";
                        $scope.SubFinancials2 = ""; 
                        $scope.SubFinancials1 = ""; 
                        $scope.SuppliersOrCustomersOremployees = "";
                        $scope.Site = ""; 
                        $scope.Company = ""; 
                        $scope.Adress = ""; 
                        $scope.Statement = "";
                        $scope.Gender = ""; 
                        $scope.Outgoings = ""; 
                        $scope.Mobile = ""; 
                        $scope.NewEntryId = "";
               
                    }
                    else {
                        console.log('fail');
                    }
                });

        }
};

});