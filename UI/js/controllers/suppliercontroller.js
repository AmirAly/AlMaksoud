almaksoud.controller("SupplierController", function ($scope, $rootScope, API, $window) {

    console.log(localStorage.getItem("username"));
    $scope.txtUserName = localStorage.getItem("username");
    if (localStorage.getItem("remember") === "false" && localStorage.getItem("username") === "") {
        window.location.href = "#/";
    }
    if (localStorage.getItem("username") === null) {
        window.location.href = "#/";
    }
    //Default Col
    
    $scope.storedCkeckboxes = JSON.parse($window.localStorage.getItem('supplierCkeckboxesValues')) || {};
    console.log($scope.storedCkeckboxes);

    if ($window.localStorage.getItem('supplierCkeckboxesValues') == null || $scope.storedCkeckboxes === '' || $scope.storedCkeckboxes === null || $scope.storedCkeckboxes === undefined) {
        console.log('if');
        $scope.supplierCheckboxes = {};
        $scope.supplierCheckboxes.byCoulmn = true;
        $scope.supplierCheckboxes.orderByCoulmn = true;
        $scope.supplierCheckboxes.dateCoulmn = true;
        $scope.supplierCheckboxes.priceCoulmn = true;
        $scope.supplierCheckboxes.statementCoulmn = true;
        $scope.supplierCheckboxes.paymentStatusCoulmn = true;
    }
    else {
        console.log('else');
        $scope.supplierCheckboxes = $scope.storedCkeckboxes;
    }


    $scope.logout = function () {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
        localStorage.setItem("remember", 'false');
        window.location.href = "#/";
    }



    $scope.hideCreateBtn = false;
    $scope.userPermissions = localStorage.getItem("permissions");
    console.log($scope.userPermissions);
    if (!($scope.userPermissions.indexOf('supplier') > -1)) {
        $scope.hideCreateBtn = true;
    };
    if (!($scope.userPermissions.indexOf('searchEditSuppliers') > -1)) {
        window.location.href = '#/dashboard';
    };


    //loader
    $scope.loading = true;



    $scope.entryArray = [];
    var flag = 0;


    $scope.editEntry = function (entry) {
        console.log(entry);
        localStorage.setItem("currentEntry", JSON.stringify(entry));
        window.location.href = '#/editsupplier';
    };




    //Selected Col
    $scope.toogleCoulmn = function () {
        //console.log($scope.selectedCoulmn);
        if ($scope.selectedCoulmn == 1) {
            if ($scope.supplierCheckboxes.byCoulmn == true)
                $scope.supplierCheckboxes.byCoulmn = false;
            else $scope.supplierCheckboxes.byCoulmn = true;
        }
        if ($scope.selectedCoulmn == 2) {
            if ($scope.supplierCheckboxes.orderByCoulmn == true)
                $scope.supplierCheckboxes.orderByCoulmn = false;
            else $scope.supplierCheckboxes.orderByCoulmn = true;
        }
        if ($scope.selectedCoulmn == 3) {
            if ($scope.supplierCheckboxes.dateCoulmn == true)
                $scope.supplierCheckboxes.dateCoulmn = false;
            else $scope.supplierCheckboxes.dateCoulmn = true;
        }
        if ($scope.selectedCoulmn == 4) {
            if ($scope.supplierCheckboxes.qtyCoulmn == true)
                $scope.supplierCheckboxes.qtyCoulmn = false;
            else $scope.supplierCheckboxes.qtyCoulmn = true;
        }
        if ($scope.selectedCoulmn == 5) {
            if ($scope.supplierCheckboxes.unitCoulmn == true)
                $scope.supplierCheckboxes.unitCoulmn = false;
            else $scope.supplierCheckboxes.unitCoulmn = true;
        }
        if ($scope.selectedCoulmn == 6) {
            if ($scope.supplierCheckboxes.weightCoulmn == true)
                $scope.supplierCheckboxes.weightCoulmn = false;
            else $scope.supplierCheckboxes.weightCoulmn = true;
        }
        if ($scope.selectedCoulmn == 7) {
            if ($scope.supplierCheckboxes.typeCoulmn == true)
                $scope.supplierCheckboxes.typeCoulmn = false;
            else $scope.supplierCheckboxes.typeCoulmn = true;
        }
        if ($scope.selectedCoulmn == 8) {
            if ($scope.supplierCheckboxes.companyCoulmn == true)
                $scope.supplierCheckboxes.companyCoulmn = false;
            else $scope.supplierCheckboxes.companyCoulmn = true;
        }
        if ($scope.selectedCoulmn == 9) {
            if ($scope.supplierCheckboxes.priceCoulmn == true)
                $scope.supplierCheckboxes.priceCoulmn = false;
            else $scope.supplierCheckboxes.priceCoulmn = true;
        }
        if ($scope.selectedCoulmn == 10) {
            if ($scope.supplierCheckboxes.supplierCoulmn == true)
                $scope.supplierCheckboxes.supplierCoulmn = false;
            else $scope.supplierCheckboxes.supplierCoulmn = true;
        }
        if ($scope.selectedCoulmn == 11) {
            if ($scope.supplierCheckboxes.siteCoulmn == true)
                $scope.supplierCheckboxes.siteCoulmn = false;
            else $scope.supplierCheckboxes.siteCoulmn = true;
        }
        if ($scope.selectedCoulmn == 12) {
            if ($scope.supplierCheckboxes.costCenterCoulmn == true)
                $scope.supplierCheckboxes.costCenterCoulmn = false;
            else $scope.supplierCheckboxes.costCenterCoulmn = true;
        }
        if ($scope.selectedCoulmn == 13) {
            if ($scope.supplierCheckboxes.costCenter2Coulmn == true)
                $scope.supplierCheckboxes.costCenter2Coulmn = false;
            else $scope.supplierCheckboxes.costCenter2Coulmn = true;
        }
        if ($scope.selectedCoulmn == 14) {
            if ($scope.supplierCheckboxes.statementCoulmn == true)
                $scope.supplierCheckboxes.statementCoulmn = false;
            else $scope.supplierCheckboxes.statementCoulmn = true;
        }
        if ($scope.selectedCoulmn == 15) {
            if ($scope.supplierCheckboxes.paymentStatusCoulmn == true)
                $scope.supplierCheckboxes.paymentStatusCoulmn = false;
            else $scope.supplierCheckboxes.paymentStatusCoulmn = true;
        }
        $scope.selectedCoulmn = 0;
        $window.localStorage.setItem("supplierCkeckboxesValues", JSON.stringify($scope.supplierCheckboxes));

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

        console.log(Page);
        var req = {
            method: 'get',
            url: 'api/Suppliers/GetLatest/' + Page,
            data: {}
        }
        //mmake the mouse cursor loading
        $('body').addClass('waiting');
        setTimeout(function () { $('body').removeClass('waiting'); }, 5000);

        API.execute(req, false).then(function (_res) {
            //var data = JSON.parse(_res.data);
            console.log(_res);
            flag = 0;
            if (_res.data.Code = 100) {
                console.log('success');
                $scope.loading = false;
                if (_res.data.Data && _res.data.Data != "No data available") {
                    $scope.entryArray = $scope.entryArray.concat(_res.data.Data);
                    console.log($scope.entryArray.length);
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
                console.log('fail');
            }
        });
    }
    $scope.loadEntry();


$scope.openDeleteModal = function (_entry) {
    $scope.EntryToDelete=_entry;
    console.log($scope.EntryToDelete);
  $('#deleteModal').modal('show');
    }


$scope.deleteEntry=function(){

            console.log('yes');
            console.log($scope.EntryToDelete);
            var req = {
                method: 'Post',
                url: 'api/Suppliers/Clear',
                data: $scope.EntryToDelete
            }
            //loade
            $scope.deleteLoading = true ; 
            
            API.execute(req, false).then(function (_res) {
                console.log(_res);
                $scope.deleteLoading = false ;
                if (_res.data.Code == 100) {
                    console.log('pass');
                    $scope.EntryToDelete = '';
                    $('#deleteModal').modal('hide');
                    //$scope.loadEntry();
                }
                else {
                    console.log('fail');
                }
            });
}
$scope.closeDeleteModal=function(){
    $scope.loadingCancel = true ;
    $scope.EntryToDelete = '';
    $('#deleteModal').modal('hide');
    $scope.loadingCancel = false ;
} 

});