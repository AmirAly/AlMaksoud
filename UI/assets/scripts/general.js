// general js file
var APILink = 'http://api.almaksoud.com/';
function CallAPI(_url, _type, _data, onsuccess, cashed) {
    $.ajax({
        url: _url,
        type: _type,
        data: _data,
        timeout: 120000,
        beforeSend: function () {
        },
        success: function (data) {
            onsuccess(JSON.parse(data));
        },
        complete: function () {
        },
        error: function (request, status, err) {
                console.log('Is seems there is a problem with your connection');
        }
    });
}
function logout(){
    localStorage.setItem("username",'');
    localStorage.setItem("password", '');
    localStorage.setItem("remember",'false');
    window.location.href="login.html";
}
