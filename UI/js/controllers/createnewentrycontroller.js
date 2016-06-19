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

     $scope.saveForm = function (form) {
        angular.forEach($scope.frmCreateNewEntry.$error.required, function (field) {
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
                    url: 'api/GL/Create',
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