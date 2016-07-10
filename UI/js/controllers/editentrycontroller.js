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
$scope.companey = [
      {name:'عمليات الاستثمار العقاري'},
      {name:'موبليات المقصود'}
];
$scope.accounts = [
      {name:'حساب1'},
      {name:'حساب2'}
];
$scope.maccounts = [
      {name:'حساب1 رئيسي'},
      {name:'حساب2 رئيسي'}
];
$scope.s1accounts = [
      {name:'حساب1 فرعي1'},
      {name:'حساب2 فرعي1'}
];
$scope.s2accounts = [
      {name:'حساب1 فرعي2'},
      {name:'حساب2 فرعي2'}
];
$scope.s3accounts = [
      {name:'حساب1 فرعي3'},
      {name:'حساب2 فرعي3'}
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
        for (var i=0, iLen=$scope.companey.length; i<iLen; i++) {
            var a;
            if ($scope.companey[i].name == retrievedObject.Company) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.accounts.length; i<iLen; i++) {
            var a;
            if ($scope.accounts[i].name == retrievedObject.Account) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.maccounts.length; i<iLen; i++) {
            var a;
            if ($scope.maccounts[i].name == retrievedObject.MasterAccount) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.s1accounts.length; i<iLen; i++) {
            var a;
            if ($scope.s1accounts[i].name == retrievedObject.SubAccount1) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.s2accounts.length; i<iLen; i++) {
            var a;
            if ($scope.s2accounts[i].name == retrievedObject.SubAccount2) {
                console.log(i); a=i;
            }
        }
        console.log(a);
        for (var i=0, iLen=$scope.s3accounts.length; i<iLen; i++) {
            var a;
            if ($scope.s3accounts[i].name == retrievedObject.SubAccount3) {
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
        $scope.MainFinancials   = $scope.maccounts[a] ;
        $scope.Financials   = $scope.accounts[a] ;
        $scope.CreditorOrDebtor   = $scope.types[a];
        console.log($scope.CreditorOrDebtor);
        $scope.SubFinancials3   = $scope.s3accounts[a] ;
        $scope.SubFinancials2   = $scope.s2accounts[a] ;
        $scope.SubFinancials1   = $scope.s1accounts[a] ;
        $scope.SuppliersOrCustomersOremployees   = retrievedObject.ClientCustomerSupplier;
        $scope.Site   = retrievedObject.Site ;
        $scope.Company  = $scope.companey[a] ;
        $scope.Adress  = retrievedObject.Address;
        $scope.Statement  = retrievedObject.Statement;
        $scope.Gender   = $scope.genders[a];
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
                obj.MasterAccount= $scope.MainFinancials.name ; 
                obj.Account= $scope.Financials.name ; 
                obj.Type= $scope.CreditorOrDebtor.name ; 
                obj.SubAccount3= $scope.SubFinancials3.name ;
                obj.SubAccount2= $scope.SubFinancials2.name ; 
                obj.SubAccount1= $scope.SubFinancials1.name ; 
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

