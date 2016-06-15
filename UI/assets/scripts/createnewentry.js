$(document).ready(function(){
console.log(localStorage.getItem("username"));
document.getElementById('txtUserName').innerHTML=localStorage.getItem("username");
if(localStorage.getItem("remember")==="false" && localStorage.getItem("username") === "" ) {
window.location.href="login.html";
}
// create New Entry
    $("#frmCreateNewEntry").validate({
        rules: {
            txtMonth: {
                required: true,
            },
            txtDay: {
                required: true,
            },
            txtName: {
                required: true,
            },
            txtCreditor: {
                required: true,
            },
            txtDebtor: {
                required: true,
            },
            txtYear: {
                required: true,
            },
            txtMainFinancials: {
                required: true,
            },
            txtFinancials: {
                required: true,
            },
            txtCreditorOrDebtor: {
                required: true,
            },
            txtSubFinancials3: {
                required: true,
            },
            txtSubFinancials2: {
                required: true,
            },
            txtSubFinancials1: {
                required: true,
            },
            txtSuppliersOrCustomersOremployees: {
                required: true,
            },
            txtSite: {
                required: true,
            },
            txtCompany: {
                required: true,
            },
            txtAdress: {
                required: true,
            },
            txtStatement: {
                required: true,
            },
            txtGender: {
                required: true,
            },
            txtOutgoings: {
                required: true,
            },
            txtMobile: {
                required: true,
            }
        },
        messages: {
            txtMonth: {
                required: 'مطلوب',
            },
            txtDay: {
                required: 'مطلوب',
            },
            txtName: {
                required: 'مطلوب',
            },
            txtCreditor: {
                required: 'مطلوب',
            },
            txtDebtor: {
                required: 'مطلوب',
            },
            txtYear: {
                required: 'مطلوب',
            },
            txtMainFinancials: {
                required: 'مطلوب',
            },
            txtFinancials: {
                required: 'مطلوب',
            },
            txtCreditorOrDebtor: {
                required: 'مطلوب',
            },
            txtSubFinancials3: {
                required: 'مطلوب',
            },
            txtSubFinancials2: {
                required: 'مطلوب',
            },
            txtSubFinancials1: {
                required: 'مطلوب',
            },
            txtSuppliersOrCustomersOremployees: {
                required: 'مطلوب',
            },
            txtSite: {
                required: 'مطلوب',
            },
            txtCompany: {
                required: 'مطلوب',
            },
            txtAdress: {
                required: 'مطلوب',
            },
            txtStatement: {
                required: 'مطلوب',
            },
            txtGender: {
                required: 'مطلوب',
            },
            txtOutgoings: {
                required: 'مطلوب',
            },
            txtMobile: {
                required: 'مطلوب',
            }
        },

        submitHandler: function (form) {
            var newEntryObj = {};
            newEntryObj.Month = $('#txtMonth').val();
            newEntryObj.Day = $('#txtDay').val();
            newEntryObj.Name = $('#txtName').val();
			newEntryObj.Creditor = $('#txtCreditor').val();
			newEntryObj.Debtor = $('#txtDebtor').val();
			newEntryObj.Year = $('#txtYear').val();
			newEntryObj.MainFinancials = $('#txtMainFinancials').val();
			newEntryObj.Financials = $('#txtFinancials').val();
			newEntryObj.CreditorOrDebtor = $('#txtCreditorOrDebtor').val();
			newEntryObj.SubFinancials3 = $('#txtSubFinancials3').val();
			newEntryObj.SubFinancials2 = $('#txtSubFinancials2').val();
			newEntryObj.SubFinancials1 = $('#txtSubFinancials1').val();
			newEntryObj.SuppliersOrCustomersOremployees = $('#txtSuppliersOrCustomersOremployees').val();
			newEntryObj.Site = $('#txtSite').val();
			newEntryObj.Company = $('#txtCompany').val();
			newEntryObj.Adress = $('#txtAdress').val();
			newEntryObj.Statement = $('#txtStatement').val();
			newEntryObj.Gender = $('#txtGender').val();
			newEntryObj.Outgoings = $('#txtOutgoings').val();
			newEntryObj.Mobile = $('#txtMobile').val();
            newEntryObj.Id = $('#newEntryId').val();
            
            var _Data = newEntryObj;
            console.log(_Data);
            var newEntryid = $('#newEntryId').val();
            console.log(newEntryid);
               // create user
                var _Url = APILink + 'api/GL/Create';
                var _Type = "post";
				_Row={
					Row:[],
					Rowindex:0
				}
				var obj= [];
				obj[0] = $('#txtMonth').val();
                obj[1] = $('#txtDay').val();
                obj[2] = $('#txtName').val();
			    obj[3] = $('#txtCreditor').val();
			    obj[4] = $('#txtDebtor').val();
			    obj[5] = $('#txtYear').val();
			    obj[6] = $('#txtMainFinancials').val();
			    obj[7] = $('#txtFinancials').val();
			    obj[8] = $('#txtCreditorOrDebtor').val();
			    obj[9] = $('#txtSubFinancials3').val();
			    obj[10] = $('#txtSubFinancials2').val();
			    obj[11] = $('#txtSubFinancials1').val();
			    obj[12] = $('#txtSuppliersOrCustomersOremployees').val();
			    obj[13] = $('#txtSite').val();
			    obj[14] = $('#txtCompany').val();
			    obj[15] = $('#txtAdress').val();
			    obj[16] = $('#txtStatement').val();
			    obj[17] = $('#txtGender').val();
			    obj[18] = $('#txtOutgoings').val();
			    obj[19] = $('#txtMobile').val();
                obj[20] = $('#newEntryId').val();
				_Row.Row = obj;
				console.log(_Row)
                CallAPI(_Url, _Type, _Row, function (data) {

                    if (data.Code == 100) {
                        console.log('success');
                        $('input').val();
                        // Store
                        localStorage.setItem("txtMonth", data[0]);
                        console.log(localStorage.getItem("txtMonth"));
                        window.location.href="editnewentry.html";
                    }
                    else {
                        console.log('fail');
                    }
                }, false);
            }
});

});
