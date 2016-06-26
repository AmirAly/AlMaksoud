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

var retrievedObject =JSON.parse(localStorage.getItem('currentEntry'));
console.log(retrievedObject);
//console.log(retrievedObject.Id);

$scope.getEntry = function(){
                
        $scope.Month  = retrievedObject.Month;
        console.log(retrievedObject.Month);
        $scope.Day  = retrievedObject.Day;
        $scope.BookKeeper   = retrievedObject.By ;
        $scope.Unit   = retrievedObject.Credit;
        $scope.Weight   = retrievedObject.Debit;
        $scope.Year   = retrievedObject.Year ;
        $scope.MainCostCenter   = retrievedObject.MasterAccount;
        $scope.SubCostCenter   = retrievedObject.Account;
        $scope.CreditorOrDebtor   = retrievedObject.Type;
        $scope.SubFinancials3   = retrievedObject.SubAccount3;
        $scope.SubFinancials2   = retrievedObject.SubAccount2;
        $scope.Price   = retrievedObject.SubAccount1;
        $scope.SuppliersOrCustomersOremployees   = retrievedObject.ClientCustomerSupplier;
        $scope.Site   = retrievedObject.Site ;
        $scope.Company  = retrievedObject.Company;
        $scope.Adress  = retrievedObject.Adress;
        $scope.Statement  = retrievedObject.Statement;
        $scope.Gender   = retrievedObject.Type;
        $scope.SupplierName   = retrievedObject.PersonType;
        $scope.NewEntryId  = retrievedObject.NewEntryId;
        $scope.BuyingBy  = retrievedObject.Date;  
        $scope.EntryId = retrievedObject.Id;

}
$scope.getEntry();


$scope.saveForm = function (form) {
        
        angular.forEach($scope.frmEditSupplier.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = false ; 
            $scope.onSubmit = function(){
              $scope.loading = true ; 
            }
                var obj={};
                //obj.TimeStamp= $scope.index ;
                //obj.Date= $scope.index ;
                obj.Id= $scope.EntryId ;
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