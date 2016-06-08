$(document).ready(function () {

	$("#frmLogin").validate({
    rules: {
        username: {
            required: true,
            email: true,
        },
        password: {
            required: true,
        }
    },
    messages: {
        username: {
            email: 'إدخل صيغة بريد الكتروني صحيح',
            required: 'مطلوب',
        },
        password: {
            required: 'مطلوب',
        }
    },

submitHandler: function (form) {
 var  _Url = APILink + 'api/Users/Signin';
var _Type = "post";
var Email = $('#username').val();
var Password = $('#password').val();
var _Data = {Email:Email,Password:Password};
CallAPI(_Url, _Type, _Data, function (data) {
            if (data.Code == 100) {
                console.log('success');
                window.location.href="dashboard.html";
            }
            else {
            	console.log('fail');
            }
        }, false);

    }
});
});
