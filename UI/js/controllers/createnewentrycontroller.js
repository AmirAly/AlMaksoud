almaksoud.controller("CreatenewentryController", function ($scope, $rootScope, API) {

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

if (!($scope.userPermissions.indexOf('accounts') > -1)) {
                window.location.href='#/dashboard';
};



// Date Picker
var datetime= new Date().toLocaleString();
console.log(datetime);

var now = "2012-01-13 04:37:20";
function toJSDate (dateTime) {
var dateTime = dateTime.split(" ");//dateTime[0] = date, dateTime[1] = time
var date = dateTime[0].split("-");
var time = dateTime[1].split(":");
//(year, month, day, hours, minutes, seconds, milliseconds)
return new Date(date[0], date[1], date[2], time[0], time[1], time[2], 0);
}
var jsDate = toJSDate(now);
var dd = jsDate.toLocaleDateString() + " " + jsDate.toLocaleTimeString();
console.log(dd);



$scope.saveForm = function (form) {
        angular.forEach($scope.frmCreateNewEntry.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = true ;  
           
                var obj={};
                //obj.Id= $scope.index ;
                //obj.TimeStamp= $scope.datetime ;
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
                    url: 'api/GL/Create',
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

               $scope.frmCreateNewEntry.$setPristine();
               $scope.frmCreateNewEntry.$setUntouched()
                    }
                    else {
                        console.log('fail');
                    }
                });

        }
};
                

});