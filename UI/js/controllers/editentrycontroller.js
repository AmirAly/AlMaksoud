almaksoud.controller("EditentryController", function ($scope, $rootScope, API) {

$scope.load=function(){
$scope.loading=true;
var req = {
            method: 'Get',
            url: 'api/Lookups/All/All',
            data: {}
          }
          API.execute(req, false).then(function (_res) {
            console.log(_res.data);
            if (_res.data.Code == 100) {
            console.log('success');
            $rootScope.lookups = _res.data.Data;
            console.log($rootScope.lookups);
            // $scope.genderNames= $rootScope.lookups.Suppliers;
            $scope.loading=false;
            }
            else {
              console.log('fail');
            }
          });
}
$scope.load();
    
    console.log(localStorage.getItem("username"));
    $scope.txtUserName = localStorage.getItem("username");
    if (localStorage.getItem("remember") === "false" && localStorage.getItem("username") === "") {
        window.location.href = "#/";
    }
    if (localStorage.getItem("username") === null) {
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

if (!($scope.userPermissions.indexOf('searchEditDeals') > -1)) {
                window.location.href='#/dashboard';
};


var retrievedObject =JSON.parse(localStorage.getItem('currentEntry'));
console.log(retrievedObject);
//console.log(retrievedObject.Id);




//datePicker
$scope.datePicker=function () {
    $( "#txtDate" ).datepicker();
};
$scope.datePicker();

//default currentDate
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    console.log(newdate);
    $scope.Date = newdate;



//Select Option
$scope.types = [
      {name:'دائن'},
      {name:'مدين'}
];
$scope.genders = [
      {name:'مورد'},
      {name:'عامل'},
      {name:'موظف'}
];
$scope.Gender = $scope.genders[0];
$scope.Genderchange = function () {
        console.log($scope.Gender.name);
        if ($scope.Gender.name == 'مورد') {
          $scope.genderNames= $rootScope.lookups.Suppliers;
          $scope.typeOfPerson = 'Suppliers';
        }
        else if ($scope.Gender.name == 'عامل') {
          $scope.genderNames= $rootScope.lookups.Customers;
          $scope.typeOfPerson = 'Customers';
        }
        else {
          $scope.genderNames =[];
          $scope.typeOfPerson = 'Employee';
        }
    };
$scope.companyes = [
      {name:'عمليات الاستثمار العقاري'},
      {name:'موبليات المقصود'}
];



$scope.getEntry = function(){
       for (var i=0, iLen=$scope.types.length; i<iLen; i++) {
            var a;
            if ($scope.types[i].name == retrievedObject.Type) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.genders.length; i<iLen; i++) {
            var a;
            if ($scope.genders[i].name == retrievedObject.PersonType) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.companyes.length; i<iLen; i++) {
            var a;
            if ($scope.companyes[i].name == retrievedObject.Company) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        
        


        month  = retrievedObject.Month;
        console.log(retrievedObject.Month);
        day  = retrievedObject.Day;
        year   = retrievedObject.Year ;
        $scope.Name   = retrievedObject.By ;
        $scope.Creditor   = retrievedObject.Credit;
        $scope.Debtor   = retrievedObject.Debit;
        $scope.MainFinancials   = retrievedObject.MasterAccount ;
        $scope.Financials   = retrievedObject.Account ;
        $scope.CreditorOrDebtor   = $scope.types[a];
        console.log($scope.CreditorOrDebtor);
        $scope.SubFinancials3   = retrievedObject.SubAccount3 ;
        $scope.SubFinancials2   = retrievedObject.SubAccount2 ;
        $scope.SubFinancials1   = retrievedObject.SubAccount1 ;
        $scope.Site   = retrievedObject.Site ;
        $scope.Company  = $scope.companyes[a] ;
        $scope.Adress  = retrievedObject.Address;
        $scope.Statement  = retrievedObject.Statement;
        // $scope.Gender   = retrievedObject.PersonType;
        var x = retrievedObject.PersonType;
        for (var i = 0; i < $scope.genders.length; i++) {
            if ($scope.genders[i].name == x) {
                $scope.Gender = $scope.genders[i];
                console.log($scope.Gender)
            }
        }
        if(retrievedObject.PersonType == 'مورد'){
            $scope.genderNames= $rootScope.lookups.Suppliers;
            $scope.typeOfPerson = 'Suppliers';
        }
        else if (retrievedObject.PersonType == 'عامل') {
            $scope.genderNames= $rootScope.lookups.Customers;
            $scope.typeOfPerson = 'Customers';
        }
        else{
            $scope.genderNames =[];
            $scope.typeOfPerson = 'Employee';
        }
        $scope.SuppliersOrCustomersOremployees   = retrievedObject.ClientCustomerSupplier;
        $scope.Outgoings   = retrievedObject.Outgoings;
        $scope.Mobile  = retrievedObject.Mobile;
        $scope.NewEntryId  = retrievedObject.NewEntryId;
        $scope.EntryId = retrievedObject.Id;
        $scope.Date=  retrievedObject.Day +'-' +retrievedObject.Month+ '-' +retrievedObject.Year;

}
$scope.getEntry();


$scope.reloadLookups = function () {
        // get lookups data
        var req = {
            method: 'Get',
            url: 'api/Lookups/All/All',
            data: {}
        }
        API.execute(req, false).then(function (_res) {
            console.log(_res.data);
            if (_res.data.Code == 100) {
                console.log('success');
                $rootScope.lookups = _res.data.Data;
                console.log($rootScope.lookups);
            }
            else {
                console.log('fail');
            }
        });
    };
    

 $scope.closeModal = function () {
        $('#modalCMBAccountData').modal('hide');
    }
 $scope.editingLookup = '';
 $scope.ModallookupsArray = [];

    $scope.showLookupModal = function (_property) {
        $scope.editingLookup = _property;
        if (_property == 'Account') {
            $scope.ModallookupsArray = $rootScope.lookups.Account;
        }
        else if (_property == 'Locations') {
            $scope.ModallookupsArray = $rootScope.lookups.Locations;
        }
        else if (_property == 'SubAccount') {
            $scope.ModallookupsArray = $rootScope.lookups.SubAccount;
        }
        else if (_property == 'SubAccount2') {
            $scope.ModallookupsArray = $rootScope.lookups.SubAccount2;
        }
        else if (_property == 'SubAccount3') {
            $scope.ModallookupsArray = $rootScope.lookups.SubAccount3;
        }
        else if (_property == 'Suppliers') {
            $scope.ModallookupsArray = $rootScope.lookups.Suppliers;
        }
        else if (_property == 'Customers') {
            $scope.ModallookupsArray = $rootScope.lookups.Customers;
        }
        else if (_property == 'Employees') {
            $scope.ModallookupsArray = $rootScope.lookups.Employees;
        }
        else {
            // remaining one
        }
        $("#modalCMBAccountData").modal();
    }

    $scope.addAccount = function () {
      console.log($scope.newAccount);
      if ($scope.newAccount === "" || $scope.newAccount === null || $scope.newAccount === undefined) {
      $scope.errorMsg=true;
      }
      else {
        $scope.ModallookupsArray.push($scope.newAccount);
        $scope.errorMsg=false;
      }
        
    }

    $scope.removeAccount = function (_index) {
        console.log(_index);
        $scope.ModallookupsArray.splice(_index, 1);
    }

    $scope.saveLookups = function () {
        $scope.loadingModal = true;
        if ($scope.editingLookup == "Account")
            $rootScope.lookups.Account = $scope.ModallookupsArray;

        else if ($scope.editingLookup == "Locations")
            $rootScope.lookups.Locations = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "SubAccount")
            $rootScope.lookups.SubAccount = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "SubAccount2")
            $rootScope.lookups.SubAccount2 = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "SubAccount3")
            $rootScope.lookups.SubAccount3 = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "Suppliers")
            $rootScope.lookups.Suppliers = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "Customers")
            $rootScope.lookups.Customers = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "Employees")
            $rootScope.lookups.Employees = $scope.ModallookupsArray;
            // remain one 
        }


        var req = {
            method: 'Post',
            url: 'api/Lookups/Update',
            data:  $rootScope.lookups 
        }
        API.execute(req, false).then(function (_res) {
            console.log(_res.data);
            if (_res.data == true) {
                $scope.loadingModal = false;
                $scope.ModallookupsArray = [];
                $scope.newAccount = '';
                $("#modalCMBAccountData").modal('hide');
                console.log($rootScope.lookups);
            }
            else {
                console.log('fail');
            }
        });
    



$scope.saveForm = function (form) {
    $scope.Date= $('#txtDate').val();
        angular.forEach($scope.frmEditEntry.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.saveLoading = true ; 

                var obj={};
                //datePicker;
                var date= $('#txtDate').val();
                console.log(date);
                var elem = date.split('/');  
                month = elem[1];  
                day = elem[0];  
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
                obj.Type= $scope.CreditorOrDebtor.name ; 
                obj.SubAccount3= $scope.SubFinancials3 ;
                obj.SubAccount2= $scope.SubFinancials2 ; 
                obj.SubAccount1= $scope.SubFinancials1 ; 
                obj.ClientCustomerSupplier= $scope.SuppliersOrCustomersOremployees ;
                obj.Site= $scope.Site ; 
                obj.Company= $scope.Company.name ; 
                obj.Address= $scope.Adress ; 
                obj.Statement= $scope.Statement ;
                obj.PersonType= $scope.Gender.name ; 
                obj.Outgoings= $scope.Outgoings ; 
                obj.Mobile= $scope.Mobile ; 
                obj.NewEntryId= $scope.NewEntryId;
                obj.TimeStamp = new Date().toISOString();
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
                    $scope.saveLoading = false ;
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

almaksoud.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});

