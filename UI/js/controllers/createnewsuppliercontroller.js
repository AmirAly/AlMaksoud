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
                $.loader({
                   className: "blue-with-image",
                   content: ''
                });
                
           _Row={
                    Row:[],
                    Rowindex:0
                }
                var obj= [];
                obj[0]= $scope.Day ;
                obj[1] = $scope.BuyingBy ;
                obj[2] = $scope.BookKeeper ;
                obj[3] = $scope.Quantity ;
                obj[4] = $scope.Year ;
                obj[5] = $scope.Month ; 
                obj[6] = $scope.Gender ; 
                obj[7] = $scope.Weight ; 
                obj[8] = $scope.Unit ; 
                obj[9] = $scope.SupplierName ;
                obj[10] = $scope.Price ; 
                obj[11] = $scope.Company ; 
                obj[12] = $scope.SubCostCenter ;
                obj[13] = $scope.MainCostCenter ; 
                obj[14] = $scope.Site ;
                obj[15] = $scope.NewSupplierId;
                _Row.Row = obj;
                console.log(_Row);
               var req = {
                    method: 'POST',
                    url: 'api/Suppliers/Create',
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

        }
};

});