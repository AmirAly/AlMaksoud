almaksoud.controller("CreatenewentryController", function ($scope, $rootScope, API) {
  
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
            $scope.genderNames= $rootScope.lookups.Suppliers;
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


    $scope.logout = function () {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
        localStorage.setItem("remember", 'false');
        window.location.href = "#/";
    }


    $scope.userPermissions = localStorage.getItem("permissions");
    console.log($scope.userPermissions);

    if (!($scope.userPermissions.indexOf('accounts') > -1)) {
        window.location.href = '#/dashboard';
    };

    //datePicker
    $scope.datePicker = function () {
        $("#txtDate").datepicker();
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


    //default Name
    $scope.Name = localStorage.getItem("username");
    console.log($scope.Name);


    //Select Option
    $scope.types = [
          { name: 'دائن' },
          { name: 'مدين' }
    ];
    $scope.CreditorOrDebtor = $scope.types[0];
    console.log($scope.CreditorOrDebtor);
    $scope.change = function () {
        console.log($scope.CreditorOrDebtor.name);
    };
    $scope.genders = [
     //{ name: '' },
          { name: 'مورد' },
          { name: 'عامل' },
          { name: 'موظف' }
    ];
    $scope.Gender = $scope.genders[0];
    console.log($scope.Gender);
    $scope.Genderchange = function () {
        console.log($scope.Gender.name);
        if ($scope.Gender.name == 'مورد') {
          $scope.genderNames= $rootScope.lookups.Suppliers;
        }
        else if ($scope.Gender.name == 'عامل') {
          $scope.genderNames= $rootScope.lookups.Customers;
        }
        else {
          $scope.genderNames =[];
        }
    };
    $scope.companyes = [
          { name: 'عمليات الاستثمار العقاري' },
          { name: 'موبليات المقصود' }
    ];
    $scope.Company = $scope.companyes[0];
    console.log($scope.Company);
    $scope.Companychange = function () {
        console.log($scope.Company.name);
    };
    $scope.accounts = [
          { name: 'حساب1' },
          { name: 'حساب2' }
    ];
    $scope.Financials = $scope.accounts[0];
    console.log($scope.Financials);
    $scope.Accountchange = function () {
        console.log($scope.Financials);
    };
    $scope.maccounts = [
          { name: 'حساب1 رئيسي' },
          { name: 'حساب2 رئيسي' }
    ];
    $scope.MainFinancials = $scope.maccounts[0];
    console.log($scope.MainFinancials);
    $scope.MAccountchange = function () {
        console.log($scope.MainFinancials.name);
    };
    $scope.s1accounts = [
          { name: 'حساب1 فرعي1' },
          { name: 'حساب2 فرعي1' }
    ];
    $scope.SubFinancials1 = $scope.s1accounts[0];
    console.log($scope.SubFinancials1);
    $scope.S1Accountchange = function () {
        console.log($scope.SubFinancials1.name);
    };
    $scope.s2accounts = [
          { name: 'حساب1 فرعي2' },
          { name: 'حساب2 فرعي2' }
    ];
    $scope.SubFinancials2 = $scope.s2accounts[0];
    console.log($scope.SubFinancials2);
    $scope.S2Accountchange = function () {
        console.log($scope.SubFinancials2.name);
    };
    $scope.s3accounts = [
          { name: 'حساب1 فرعي3' },
          { name: 'حساب2 فرعي3' }
    ];
    $scope.SubFinancials3 = $scope.s3accounts[0];
    console.log($scope.SubFinancials3);
    $scope.S3Accountchange = function () {
        console.log($scope.SubFinancials3.name);
    };

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
        else if (_property == 'Account') {
            $scope.ModallookupsArray = $rootScope.lookups.Account;
        }
        else if (_property == 'Account') {
            $scope.ModallookupsArray = $rootScope.lookups.Account;
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
        else if ($scope.editingLookup == "Account")
            $rootScope.lookups.Account = $scope.ModallookupsArray;
        else if ($scope.editingLookup == "Account")
            $rootScope.lookups.Account = $scope.ModallookupsArray;
        else {
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
    }
   
    $scope.saveForm = function (form) {
        //console.log($('#txtDate').val());
        // $scope.Date= $('#txtDate').val();
        angular.forEach($scope.frmCreateNewEntry.$error.required, function (field) {
            field.$setDirty();
        });
        if (form.$valid) {
            //loader
            $scope.loading = true;

            var obj = {};
            //datePicker;
            var date = $('#txtDate').val();
            console.log(date);
            var elem = date.split('/');
            month = elem[1];
            day = elem[0];
            year = elem[2];
            console.log(day);

            obj.Month = month;
            obj.Day = day;
            obj.Year = year;
            obj.By = $scope.Name;
            obj.Credit = $scope.Creditor;
            obj.Debit = $scope.Debtor;
            obj.MasterAccount = $scope.MainFinancials;
            obj.Account = $scope.Financials;
            obj.Type = $scope.CreditorOrDebtor.name;
            obj.SubAccount3 = $scope.SubFinancials3;
            obj.SubAccount2 = $scope.SubFinancials2;
            obj.SubAccount1 = $scope.SubFinancials1;
            obj.ClientCustomerSupplier = $scope.SuppliersOrCustomersOremployees;
            obj.Site = $scope.Site;
            obj.Company = $scope.Company.name;
            obj.Address = $scope.Adress;
            obj.Statement = $scope.Statement;
            obj.PersonType = $scope.Gender.name;
            obj.Outgoings = $scope.Outgoings;
            obj.Mobile = $scope.Mobile;
            obj.NewEntryId = $scope.NewEntryId;
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
                $scope.loading = false;
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

almaksoud.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value, 10);
            });
        }
    };
});