$(document).ready(function () {
if(localStorage.getItem("remember")==="true" && localStorage.getItem("username") != "" ) {
     window.location.href="dashboard.html";
}
else {
    localStorage.setItem("username",'');
    localStorage.setItem("password", '');
    localStorage.setItem("remember",'false');
}

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
            data = JSON.parse(data);
            if (data.Code == 100) {
                console.log('success');
                // Store
                localStorage.setItem("username", data.Data.DisplayName);
                localStorage.setItem("password", data.Data.Password);
                console.log(data.Data);
                if ($('#rememberMeCheck').is(':checked')) {
                   console.log('true');
                   localStorage.setItem("remember",'true');
                }
                else {
                    console.log('false');
                    localStorage.setItem("remember",'false');
                }
                console.log(localStorage.getItem("username"));
                window.location.href="dashboard.html";
            }
            else {
            	console.log('fail');
            }
        }, false);

    }
});
});
