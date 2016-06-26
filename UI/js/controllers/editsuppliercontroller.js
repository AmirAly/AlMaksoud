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
        
       $scope.BuyingBy = retrievedObject.OrderBy ;
       $scope.Month = retrievedObject.Month ;
        console.log(retrievedObject.Month);
       $scope.Day = retrievedObject.Day ;
       $scope.BookKeeper = retrievedObject.By ;
       $scope.Unit = retrievedObject.Unit ;
       $scope.Weight = retrievedObject.Weight ;
       $scope.Year = retrievedObject.Year ;
       $scope.Quantity = retrievedObject.Qty ;
       $scope.Gender = retrievedObject.Type ;
       $scope.Company = retrievedObject.Company ;
       $scope.Price = retrievedObject.Price ;
       $scope.SupplierName = retrievedObject.Supplier ;
       $scope.Site = retrievedObject.Site ;
       $scope.MainCostCenter = retrievedObject.CostCenter ;
       $scope.SubCostCenter = retrievedObject.CostCenter2 ;
       $scope.Statement = retrievedObject.Statement ;
       $scope.PaymentStatus = retrievedObject.PaymentStatus ;
       $scope.NewEntryId=  retrievedObject.NewEntryId; 
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