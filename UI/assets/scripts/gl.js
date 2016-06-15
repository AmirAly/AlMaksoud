$(document).ready(function(){
	console.log(localStorage.getItem("username"));
document.getElementById('txtUserName').innerHTML=localStorage.getItem("username");
if(localStorage.getItem("remember")==="false" && localStorage.getItem("username") === "" ) {
window.location.href="login.html";
}
loadEntry();
                 
            
});
var newEntryArray = {};
function loadEntry() {
    //load Entry
    var _Url = APILink + 'api/GL/GetLatest';
    var _Type = "get";
    var _Data = {};
    CallAPI(_Url, _Type, _Data, function (data) {
        console.log(data);
        data = JSON.parse(data);
        if (data) {
            console.log('success');
            $('.tblEntry').empty();
            for (var i = 0; i < data.length; i++) {
                $('.tblEntry').append('<tr>\
      <th>'+ i + '</th>\
      <td>'+ data[i][0] + '</td>\
      <td>'+ data[i][1] + '</td>\
      <td>'+ data[i][2] + '</td>\
	  <td>'+ data[i][3] + '</td>\
	  <td>'+ data[i][4] + '</td>\
	  <td>'+ data[i][5] + '</td>\
	  <td>'+ data[i][6] + '</td>\
	  <td>'+ data[i][6] + '</td>\
	  <td>'+ data[i][7] + '</td>\
      <td>\
        <!-- EditDeletebutton start -->\
        <div class="btn-group">\
        <button type="button" class="btn btn-danger dropdown-toggle editdeletebutton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
         تحديث<span class="caret"></span>\
        </button>\
        <ul class="dropdown-menu editdeletedropdown">\
        <li><a onclick="openEditModal('+ data[i][0] + ')">تعديل</a></li>\
        <li><a onclick="openDeleteModal(' + data[i][0] + ')">مسح</a></li>\
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
