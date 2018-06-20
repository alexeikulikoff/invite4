
var manageruser = manageruser || {},
	tableManagerUser = null;


manageruser.update = function() {
	var headers = {},
	fields = {
			firstname : $( "#userManagerFirstname" ),
			password : 	$( "#userManagerPassword" ),
			email : 	$( "#userManagerEmail" ),
			phone : 	$( "#userManagerPhone" ),
			city : 		$( "#currentCity" ),
			workplace : $( "#userManagerWorkPlace")
		
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { 
				
				firstname 	: 	fields.firstname.val(),
				password 	: 	fields.password.val(),
				email 		:	fields.email.val(),
				phone 		: 	fields.phone.val(),
				workplace   :   fields.workplace.val(),
				name : 		$( "#userManagerHumanName").val()
		}
		
		$.ajax({
			  type: "POST",
			  url: "updateUser",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "ERROR_UPDATE"){
					  core.showErrorMessage( $error.saveUser );
				  }
				  if (e.message == "UPDATED"){
					  
					  core.hideErrorMessage();
					  core.saveUpdateUserOK();
					  tableManagerUser.ajax.reload(null, false); 
					  fields.firstname.val("");
					  fields.password.val("");
					  fields.email.val("");
					  fields.phone.val("");
					  fields.workplace.val("");
					  $("#userManagerHumanNameDiv").removeClass("hidden");
					  $( "#userManagerHumanName").val("");
					  
					  $("#userManagerFirstnameDiv").removeClass("hidden");
					  $("#userManagerFirstname").val("");
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveUser );
				}
			});	
	}
}

manageruser.save = function( id ) {
	var headers = {},
	fields = {
			humanname : $( "#userManagerHumanName" ),
			firstname : $( "#userManagerFirstname" ),
			password : 	$( "#userManagerPassword" ),
			email : 	$( "#userManagerEmail" ),
			phone : 	$( "#userManagerPhone" ),
			city : 		$( "#currentCity" ),
			workplace : $( "#userManagerWorkPlace")
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { 
				humanname  	:  	fields.humanname.val(),
				firstname 	: 	fields.firstname.val(),
				password 	: 	fields.password.val(),
				email 		:	fields.email.val(),
				phone 		: 	fields.phone.val(),
				city 		: 	fields.city.val(),
				role 		: 	"DOC",
				workplace   :   fields.workplace.val()
		}
		
		$.ajax({
			  type: "POST",
			  url: "saveUser",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "DuplicateKeyException"){
					  core.showErrorMessage( $error.saveUser );
				  }
				  if (e.message == "SAVED"){
					  core.hideErrorMessage();
					  core.saveUpdateUserOK();
					  tableManagerUser.ajax.reload(null, false); 
					  fields.humanname.val("");
					  fields.firstname.val("");
					  fields.password.val("");
					  fields.email.val("");
					  fields.phone.val("");
					  fields.workplace.val("");
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveUser );
				}
			});	
	}

}

manageruser.action = function(){
	
	if ($("#userManagerFirstnameDiv").hasClass("hidden")){
		
		manageruser.update();
		
	}else{
		manageruser.save();
	}
}

manageruser.init = function( data ){
	
	console.log("manager user init");
	if (tableManagerUser != null){
		tableManagerUser.destroy();
	}
	
	var currentCity = $("#currentCity").val();
	console.log( currentCity );
	
	tableManagerUser = $('#tableManagerUser').DataTable({
		 "language": {
			  "processing": "Подождите...",
			  "search": "Поиск по фамилии: ",
			  "lengthMenu": "Показать _MENU_ записей",
			  "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
			  "infoEmpty": "Записи с 0 до 0 из 0 записей",
			  "infoFiltered": "(отфильтровано из _MAX_ записей)",
			  "infoPostFix": "",
			  "loadingRecords": "Загрузка записей...",
			  "zeroRecords": "Записи отсутствуют.",
			  "emptyTable": "В таблице отсутствуют данные",
			  "paginate": {
			    "first": "Первая",
			    "previous": "Предыдущая",
			    "next": "Следующая",
			    "last": "Последняя"
			  },
			  "aria": {
			    "sortAscending": ": активировать для сортировки столбца по возрастанию",
			    "sortDescending": ": активировать для сортировки столбца по убыванию"
			  }
			
		 },
		"ajax": {
			"url" : "getUsersByCityAndRole?cityName=" + currentCity, 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			             { title :  $label.fiolong,  		className: "table-font",	data	: "name" },
			             { title :  $label.userWorkPlace, 	className: "table-font",	data	: "workplace" },
			             { title :  $label.phone,    	className: "table-font text-center",	data	: "phone" },
			             { title :  $label.userLogin,   	className: "table-font text-center",	data	: "firstname" },
			             { title :  $label.userEmail,  	className: "table-font",	data	: "email" },
			             { title :  $label.change,   	className: "table-font text-center",	data	: "password", render : function( data, type, row )
			            	 {
			            	 return '<button type="button" class="btn-danger btn-xs"  ' + 
			            		'onclick="manageruser.changeAll(\'' + row.name + '\',\'' + row.firstname + '\',\'' + row.password + '\',\'' + row.phone + '\',\'' + row.workplace +'\',\'' + row.email + '\')">'+  $label.change +'</button>';
			            	 }
			            	 
			             }
			         ],	
		"iDisplayLength": 50,
	//	"paging": false,
	//	"info":     false,
	//	"searching" : false,
	//	"scrollY": "950px",
        "scrollCollapse": true
		});
	$("#tableManagerUser_length").removeClass("dataTables_length");
	$("#tableManagerUser_length").addClass("col-lg-3 col-sm-3");
	
	$("#tableManagerUser_length").children().children().addClass("filter-control");
	$("#tableManagerUser_filter").children().children().addClass("filter-control");

	
}
manageruser.changeAll = function(name, firstname, password, phone, workplace, email ){
	
	
	$("#userManagerWorkPlace").val( workplace );
	$("#userManagerFirstname").val( firstname );
	$("#userManagerPassword").val( password );
	$("#userManagerEmail").val( email );
	$("#userManagerPhone").val( phone );
	$( "#userManagerHumanName").val( name );
	
	
	
	$("#userManagerFirstnameDiv").addClass("hidden");
	$("#userManagerHumanNameDiv").addClass("hidden");
	$("#collapseManagerUser").collapse("show");
}
manageruser.clearNewUser = function( data ){
	
}

