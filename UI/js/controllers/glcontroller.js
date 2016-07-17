almaksoud.controller("GlController", function ($scope, $rootScope, API, $window) {
    console.log(localStorage.getItem("username"));
    $scope.txtUserName = localStorage.getItem("username");
    if (localStorage.getItem("remember") === "false" && localStorage.getItem("username") === "") {
        window.location.href = "#/";
    }
    if (localStorage.getItem("username") === null) {
        window.location.href = "#/";
    }

    //Default Col
    $scope.storedCkeckboxes = JSON.parse($window.localStorage.getItem('glCkeckboxesValues')) || {};
    console.log($scope.storedCkeckboxes);

    if ($window.localStorage.getItem('glCkeckboxesValues') == null || $scope.storedCkeckboxes === '' || $scope.storedCkeckboxes === null || $scope.storedCkeckboxes === undefined) {
        console.log('if');
        $scope.glCheckboxes = {};
        $scope.glCheckboxes.nameCoulmn = true;
        $scope.glCheckboxes.dateCoulmn = true;
        $scope.glCheckboxes.creditCoulmn = true;
        $scope.glCheckboxes.debitCoulmn = true;
        $scope.glCheckboxes.typeCoulmn = true;
        $scope.glCheckboxes.accountCoulmn = true;
        $scope.glCheckboxes.clientCustomerSupplierCoulmn = true;
        $scope.glCheckboxes.personTypeCoulmn = true;
        $scope.glCheckboxes.companyCoulmn = true;
    }
    else {
        console.log('else');
        $scope.glCheckboxes = $scope.storedCkeckboxes;
    }

    $scope.logout = function () {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
        localStorage.setItem("remember", 'false');
        window.location.href = "#/";
    }


    $scope.hideCreateBtn = false;
    $scope.userPermissions = localStorage.getItem("permissions");
    //console.log($scope.userPermissions);
    if (!($scope.userPermissions.indexOf('accounts') > -1)) {
        $scope.hideCreateBtn = true;
    };
    if (!($scope.userPermissions.indexOf('searchEditDeals') > -1)) {
        window.location.href = '#/dashboard';
    };


    //loader
    $scope.loading = true;



    $scope.entryArray = [];
    var flag = 0;

    $scope.editEntry = function (entry) {
        //console.log(entry);
        localStorage.setItem("currentEntry", JSON.stringify(entry));
        window.location.href = '#/editentry';
    }



    
    //Selected Col
    $scope.toogleCoulmn = function () {
        //console.log($scope.selectedCoulmn);
        if ($scope.selectedCoulmn == 1) {
            if ($scope.glCheckboxes.nameCoulmn == true)
                $scope.glCheckboxes.nameCoulmn = false;
            else $scope.glCheckboxes.nameCoulmn = true;
        }
        if ($scope.selectedCoulmn == 2) {
            if ($scope.glCheckboxes.dateCoulmn == true)
                $scope.glCheckboxes.dateCoulmn = false;
            else $scope.glCheckboxes.dateCoulmn = true;
        }
        if ($scope.selectedCoulmn == 3) {
            if ($scope.glCheckboxes.creditCoulmn == true)
                $scope.glCheckboxes.creditCoulmn = false;
            else $scope.glCheckboxes.creditCoulmn = true;
        }
        if ($scope.selectedCoulmn == 4) {
            if ($scope.glCheckboxes.debitCoulmn == true)
                $scope.glCheckboxes.debitCoulmn = false;
            else $scope.glCheckboxes.debitCoulmn = true;
        }
        if ($scope.selectedCoulmn == 5) {
            if ($scope.glCheckboxes.typeCoulmn == true)
                $scope.glCheckboxes.typeCoulmn = false;
            else $scope.glCheckboxes.typeCoulmn = true;
        }
        if ($scope.selectedCoulmn == 6) {
            if ($scope.glCheckboxes.accountCoulmn == true)
                $scope.glCheckboxes.accountCoulmn = false;
            else $scope.glCheckboxes.accountCoulmn = true;
        }
        if ($scope.selectedCoulmn == 7) {
            if ($scope.glCheckboxes.masterAccountCoulmn == true)
                $scope.glCheckboxes.masterAccountCoulmn = false;
            else $scope.glCheckboxes.masterAccountCoulmn = true;
        }
        if ($scope.selectedCoulmn == 8) {
            if ($scope.glCheckboxes.subAccount1Coulmn == true)
                $scope.glCheckboxes.subAccount1Coulmn = false;
            else $scope.glCheckboxes.subAccount1Coulmn = true;
        }
        if ($scope.selectedCoulmn == 9) {
            if ($scope.glCheckboxes.subAccount2Coulmn == true)
                $scope.glCheckboxes.subAccount2Coulmn = false;
            else $scope.glCheckboxes.subAccount2Coulmn = true;
        }
        if ($scope.selectedCoulmn == 10) {
            if ($scope.glCheckboxes.subAccount3Coulmn == true)
                $scope.glCheckboxes.subAccount3Coulmn = false;
            else $scope.glCheckboxes.subAccount3Coulmn = true;
        }
        if ($scope.selectedCoulmn == 11) {
            if ($scope.glCheckboxes.companyCoulmn == true)
                $scope.glCheckboxes.companyCoulmn = false;
            else $scope.glCheckboxes.companyCoulmn = true;
        }
        if ($scope.selectedCoulmn == 12) {
            if ($scope.glCheckboxes.siteCoulmn == true)
                $scope.glCheckboxes.siteCoulmn = false;
            else $scope.glCheckboxes.siteCoulmn = true;
        }
        if ($scope.selectedCoulmn == 13) {
            if ($scope.glCheckboxes.clientCustomerSupplierCoulmn == true)
                $scope.glCheckboxes.clientCustomerSupplierCoulmn = false;
            else $scope.glCheckboxes.clientCustomerSupplierCoulmn = true;
        }
        if ($scope.selectedCoulmn == 14) {
            if ($scope.glCheckboxes.personTypeCoulmn == true)
                $scope.glCheckboxes.personTypeCoulmn = false;
            else $scope.glCheckboxes.personTypeCoulmn = true;
        }
        if ($scope.selectedCoulmn == 15) {
            if ($scope.glCheckboxes.statementCoulmn == true)
                $scope.glCheckboxes.statementCoulmn = false;
            else $scope.glCheckboxes.statementCoulmn = true;
        }
        if ($scope.selectedCoulmn == 16) {
            if ($scope.glCheckboxes.addressCoulmn == true)
                $scope.glCheckboxes.addressCoulmn = false;
            else $scope.glCheckboxes.addressCoulmn = true;
        }
        if ($scope.selectedCoulmn == 17) {
            if ($scope.glCheckboxes.mobileCoulmn == true)
                $scope.glCheckboxes.mobileCoulmn = false;
            else $scope.glCheckboxes.mobileCoulmn = true;
        }
        if ($scope.selectedCoulmn == 18) {
            if ($scope.glCheckboxes.outgoingsCoulmn == true)
                $scope.glCheckboxes.outgoingsCoulmn = false;
            else $scope.glCheckboxes.outgoingsCoulmn = true;
        }
        $scope.selectedCoulmn = 0;
        //console.log($scope.glCheckboxes);
        $window.localStorage.setItem("glCkeckboxesValues", JSON.stringify($scope.glCheckboxes));
        //$scope.test = JSON.parse($window.localStorage.getItem('glCkeckboxesValues')) || {};
        //console.log($scope.test);

    }







    var Page = 0;
    $(document).scroll(function () {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 40) {
            $scope.loadEntry();
        }
    });

    $scope.loadEntry = function () {
        if (flag == 1)
            return;
        else
            flag = 1;

        //console.log(Page);
        var req = {
            method: 'get',
            url: 'api/GL/GetLatest/' + Page,
            data: {}
        }
        //mmake the mouse cursor loading
        $('body').addClass('waiting');
        setTimeout(function () { $('body').removeClass('waiting'); }, 5000);

        API.execute(req, false).then(function (_res) {
            //var data = JSON.parse(_res.data);
            //console.log(_res);
            flag = 0;
            if (_res.data.Code = 100) {
                //console.log('success');
                $scope.loading = false;
                if (_res.data.Data && _res.data.Data != "No data available") {
                    $scope.entryArray = $scope.entryArray.concat(_res.data.Data);
                    //console.log($scope.entryArray.length);
                    Page++;
                    //hide
                    $('body').removeClass('waiting');
                }
            }
            else {
                //hide
                $('body').removeClass('waiting');
                flag = 0;
                Page++;
                //console.log('fail');
            }
        });
    }
    $scope.loadEntry();


$scope.openDeleteModal = function (entry) {
         $scope.deleteExistEntry=entry;
         $('#deleteModal').modal('show');

    }


$scope.deleteEntry=function(){

            console.log('yes ' + $scope.deleteExistEntry );
            var req = {
                method: 'Post',
                url: 'api/GL/Clear' + $scope.deleteExistEntry,
                data: {}
            }
            //loade
            $scope.deleteLoading = true ; 
            
            API.execute(req, false).then(function (_res) {
                //var data = JSON.parse(_res.data);
                console.log(_res);
                $scope.deleteLoading = false ;
                if (_res.data.Code == 100) {
                    console.log('pass');
                    $scope.deleteExistEntry='';
                    $('#deleteModal').modal('hide');
                    $scope.loadEntry();
                }
                else {
                    console.log('fail');
                }
            });
}
$scope.closeDeleteModal=function(){
    $scope.loadingCancel = true ;
    $scope.deleteExistEntry='';
    $('#deleteModal').modal('hide');
    $scope.loadingCancel = false ;
}  


});