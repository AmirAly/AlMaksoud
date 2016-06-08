$(document).ready(function () {
loadUsers();

//filter
$('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.tblUsers tr').hide();
            $('.tblUsers tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        });


// create user modal
	$("#frmCreateUser").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
        },
        displayName: {
            required: true,
        }
    },
    messages: {
        email: {
            email: 'إدخل صيغة بريد الكتروني صحيح',
            required: 'مطلوب',
        },
        password: {
            required: 'مطلوب',
        },
        displayName: {
            required: 'مطلوب',
        }
    },

submitHandler: function (form) {
var userObj={};
userObj.Email = $('#email').val();
userObj.DisplayName = $('#displayName').val();
userObj.Password = $('#password').val();
userObj.Id = $('#ModalUserId').val();
userObj.Permissions = "Accounts";

var _Data = userObj;
console.log(_Data);
var userid = $('#ModalUserId').val();
console.log(userid);
    if (userid) {
//edit user
    var  _Url = APILink + 'api/Users/Edit';
var _Type = "post";

CallAPI(_Url, _Type, _Data, function (data) {

            if (data.Code == 100) {
                console.log('success');
                loadUsers();
 $('#email').val('');
$('#displayName').val('');
 $('#password').val('');
$('#ModalUserId').val('');
                $('#myModal').modal('hide');

            }
            else {
                console.log('fail');
            }
        }, false);
    }
else {
    // create user
    var  _Url = APILink + 'api/Users/Create';
var _Type = "post";

CallAPI(_Url, _Type, _Data, function (data) {

            if (data.Code == 100) {
                console.log('success');
                loadUsers();
                 $('#email').val('');
$('#displayName').val('');
 $('#password').val('');
$('#ModalUserId').val('');
                $('#myModal').modal('hide');

            }
            else {
                console.log('fail');
            }
        }, false);
}

    }
});
});
var usersArray={};
function loadUsers(){
    //load users
 var  _Url = APILink + 'api/Users/GetAll';
var _Type = "get";
var _Data = {};
CallAPI(_Url, _Type, _Data, function (data) {

            if (data.Code == 100) {
                console.log('success');
                usersArray=data.Data;
                $('.tblUsers').empty();
                for (var i = 0; i < data.Data.length; i++) {
                    $('.tblUsers').append('<tr>\
      <th>'+i+'</th>\
      <td>'+data.Data[i].DisplayName+'</td>\
      <td>'+data.Data[i].Email+'</td>\
      <td>'+data.Data[i].Password+'</td>\
      <td>\
        <!-- EditDeletebutton start -->\
        <div class="btn-group">\
        <button type="button" class="btn btn-danger dropdown-toggle editdeletebutton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
         تحديث<span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu editdeletedropdown">\
        <li><a onclick="openEditModal('+data.Data[i].Id+')">تعديل</a></li>\
        <li><a href="#">مسح</a></li>\
        </ul>\
        </div>\
        <!-- EditDelete button end -->\
      </td>\
    </tr>');
                }
            }
            else {
                console.log('fail');
            }
        }, false);
}

function openEditModal(_userId){
console.log(_userId);
var thisUser = usersArray[_userId-1];
$('#email').val(thisUser.Email);
$('#displayName').val(thisUser.DisplayName);
$('#password').val(thisUser.Password);
$('#ModalUserId').val(thisUser.Id);
$('#myModal').modal('show');
}
