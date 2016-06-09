$(document).ready(function(){
	console.log(localStorage.getItem("username"));
document.getElementById('txtUserName').innerHTML=localStorage.getItem("username");
if(localStorage.getItem("remember")==="false" && localStorage.getItem("username") === "" ) {
window.location.href="login.html";
}
});