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
//console.log(retrievedObject.Id);


$scope.datePicker=function () {
    $( "#txtDate" ).datepicker();
};
$scope.datePicker();

$scope.getEntry = function(){
        month  = retrievedObject.Month;
        console.log(retrievedObject.Month);
        day  = retrievedObject.Day;
        year   = retrievedObject.Year ;
        $scope.Name   = retrievedObject.By ;
        $scope.Creditor   = retrievedObject.Credit;
        $scope.Debtor   = retrievedObject.Debit;
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
        $scope.EntryId = retrievedObject.Id;
        $scope.Date=  retrievedObject.Day +'-' +retrievedObject.Month+ '-' +retrievedObject.Year;

}
$scope.getEntry();

$scope.saveForm = function (form) {
        $scope.Date= $('#txtDate').val();
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
                obj.By= $scope.Name ;
                obj.Credit= $scope.Creditor ;
                obj.Debit= $scope.Debtor ;
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