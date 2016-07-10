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
$scope.Date=newdate;


//default Name
$scope.Name= localStorage.getItem("username");
console.log($scope.Name);


//Select Option
$scope.types = [
      {name:'دائن'},
      {name:'مدين'}
];
$scope.CreditorOrDebtor = $scope.types[0];
console.log($scope.CreditorOrDebtor);
$scope.change=function(){
console.log($scope.CreditorOrDebtor.name);   
};
$scope.genders = [
      {name:'مورد'},
      {name:'عامل'},
      {name:'موظف'}
];
$scope.Gender = $scope.genders[0];
console.log($scope.Gender);
$scope.Genderchange=function(){
console.log($scope.Gender.name);   
};
$scope.companyes = [
      {name:'عمليات الاستثمار العقاري'},
      {name:'موبليات المقصود'}
];
$scope.Company = $scope.companyes[0];
console.log($scope.Company);
$scope.Companychange=function(){
console.log($scope.Company.name);   
};
$scope.accounts = [
      {name:'حساب1'},
      {name:'حساب2'}
];
$scope.Financials = $scope.accounts[0];
console.log($scope.Financials);
$scope.Accountchange=function(){
console.log($scope.Financials.name);   
};
$scope.maccounts = [
      {name:'حساب1 رئيسي'},
      {name:'حساب2 رئيسي'}
];
$scope.MainFinancials = $scope.maccounts[0];
console.log($scope.MainFinancials);
$scope.MAccountchange=function(){
console.log($scope.MainFinancials.name);   
};
$scope.s1accounts = [
      {name:'حساب1 فرعي1'},
      {name:'حساب2 فرعي1'}
];
$scope.SubFinancials1 = $scope.s1accounts[0];
console.log($scope.SubFinancials1);
$scope.S1Accountchange=function(){
console.log($scope.SubFinancials1.name);   
};
$scope.s2accounts = [
      {name:'حساب1 فرعي2'},
      {name:'حساب2 فرعي2'}
];
$scope.SubFinancials2 = $scope.s2accounts[0];
console.log($scope.SubFinancials2);
$scope.S2Accountchange=function(){
console.log($scope.SubFinancials2.name);   
};
$scope.s3accounts = [
      {name:'حساب1 فرعي3'},
      {name:'حساب2 فرعي3'}
];
$scope.SubFinancials3 = $scope.s3accounts[0];
console.log($scope.SubFinancials3);
$scope.S3Accountchange=function(){
console.log($scope.SubFinancials3.name);   
};








$scope.saveForm = function (form) {
    //console.log($('#txtDate').val());
    // $scope.Date= $('#txtDate').val();
        angular.forEach($scope.frmCreateNewEntry.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = true ;
           
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
                        $('#txtDate').val('');
                        month = "";
                        day = "";
                        year = ""; 
                        $scope.Name = "";
                        $scope.Creditor = "";
                        $scope.Debtor = "";
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