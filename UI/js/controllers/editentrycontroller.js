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

console.log(localStorage.getItem("currentEntry"));
var currentEntry=localStorage.getItem("currentEntry");

var values = currentEntry.split(',');
for (var i = 0; i < 20; i++) {
console.log(values[i]);
}

$scope.Date = values[0];
$scope.Name = values[1];
$scope.NewEntryId  = values[2];
$scope.Day  = values[3];
$scope.Month  = values[4];
$scope.Year  = values[5];
$scope.Creditor  = values[6]; 
$scope.Debtor  = values[7]; 
$scope.CreditorOrDebtor = values[8] ;
$scope.Financials = values[9];
$scope.MainFinancials  = values[10]; 
$scope.SubFinancials1  = values[11]; 
$scope.SubFinancials2  = values[12];
$scope.SubFinancials3  = values[13];
$scope.Company  = values[14];
$scope.Site  = values[15];
$scope.SuppliersOrCustomersOremployees  = values[16];
$scope.Gender  = values[17];
$scope.Statement  = values[18];
$scope.Adress  = values[19];
$scope.Mobile  = values[20]; 
$scope.Outgoings  = values[21];
     $scope.saveForm = function (form) {
        
        angular.forEach($scope.frmEditEntry.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
                $.loader({
                   className: "blue-with-image",
                   content: ''
                });

           _Row={
                    Row:[],
                    Rowindex:0
                }
                var obj= [];
                obj[0]= $scope.Month ;
                obj[1] = $scope.Day ;
                obj[2] = $scope.Name ;
                obj[3] = $scope.Creditor ;
                obj[4] = $scope.Debtor ;
                obj[5] = $scope.Year ; 
                obj[6] = $scope.MainFinancials ; 
                obj[7] = $scope.Financials ; 
                obj[8] = $scope.CreditorOrDebtor ; 
                obj[9] = $scope.SubFinancials3 ;
                obj[10] = $scope.SubFinancials2 ; 
                obj[11] = $scope.SubFinancials1 ; 
                obj[12] = $scope.SuppliersOrCustomersOremployees ;
                obj[13] = $scope.Site ; 
                obj[14] = $scope.Company ; 
                obj[15] = $scope.Adress ; 
                obj[16] = $scope.Statement ;
                obj[17] = $scope.Gender ; 
                obj[18] = $scope.Outgoings ; 
                obj[19] = $scope.Mobile ; 
                obj[20] = $scope.NewEntryId;
                _Row.Row = obj;
                console.log(_Row);
    var req = {
                    method: 'POST',
                    url: 'api/GL/Edit',
                    data: {_Row}
                }
                API.execute(req, false).then(function (_res) {
                    console.log(_res.data);
                    var data = JSON.parse(_res.data);
                    console.log(data);
                    $.loader("close");
                    if (data.Code == 100) {
                        console.log('pass');
                        $('input').val();
            

                        
                    }
                    else {
                        console.log('fail');
                    }
                });

        }};
                

});