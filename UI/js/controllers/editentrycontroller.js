almaksoud.controller("EditentryController", function ($scope, $rootScope, API) {
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


$scope.getEntry = function(){
        
        console.log(retrievedObject);
        $scope.Month  = retrievedObject.Month;
        $scope.Day  = retrievedObject.Day;
        $scope.Name   = retrievedObject.By ;
        $scope.Creditor   = retrievedObject.Credit;
        $scope.Debtor   = retrievedObject.Debit;
        $scope.Year   = retrievedObject.Year ;
        $scope.MainFinancials   = retrievedObject.MasterAccount;
        $scope.Financials   = retrievedObject.Account;
        $scope.CreditorOrDebtor   = retrievedObject.Type;
        $scope.SubFinancials3   = retrievedObject.SubAccount3;
        $scope.SubFinancials2   = retrievedObject.SubAccount2;
        $scope.SubFinancials1   = retrievedObject.SubAccount1;
        $scope.SuppliersOrCustomersOremployees   = retrievedObject.ClientCustomerSupplier;
        $scope.Site   = retrievedObject.Site ;
        $scope.Company  = retrievedObject.Company;
        $scope.Adress  = retrievedObject.Adress;
        $scope.Statement  = retrievedObject.Statement;
        $scope.Gender   = retrievedObject.PersonType;
        $scope.Outgoings   = retrievedObject.Outgoings;
        $scope.Mobile  = retrievedObject.Mobile;
        $scope.NewEntryId  = retrievedObject.NewEntryId;

}
$scope.getEntry();

$scope.saveForm = function (form) {
        
        angular.forEach($scope.frmEditEntry.$error.required, function (field) {
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
                    url: 'api/GL/Edit',
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
                        window.location.href="#/gl"
            

                        
                    }
                    else {
                        console.log('fail');
                    }
                });

        }};
                

});