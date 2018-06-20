
var user = user || {},
	tableUser = null;


user.save = function() {
	var headers = {},
	fields = {
			humanname : $( "#userHumanName" ),
			firstname : $( "#userFirstname" ),
			password : 	$( "#userPassword" ),
			email : 	$( "#userEmail" ),
			phone : 	$( "#userPhone" ),
			city : 		$( "#userCitySelect" ),
			role : 		$( "#userRoleSelect" ),
			workplace : $( "#userWorkPlace")
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
				role 		: 	fields.role.val(),
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
					  tableUser.ajax.reload(null, false); 
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

user.update = function() {
	var headers = {},
	fields = {
			name : 		$( "#userHumanName" ),
			firstname : $( "#userFirstname" ),
			password : 	$( "#userPassword" ),
			email : 	$( "#userEmail" ),
			phone : 	$( "#userPhone" ),
			workplace : $( "#userWorkPlace")
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { 
				name 		:   fields.name.val(),
				firstname 	: 	fields.firstname.val(),
				password 	: 	fields.password.val(),
				email 		:	fields.email.val(),
				phone 		: 	fields.phone.val(),
				workplace   :   fields.workplace.val()
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
					  tableUser.ajax.reload(null, false); 
					  fields.name.val("");
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

user.action = function(){
	if ($("#userFirstnameDiv").hasClass("hidden")){
		user.update();
	}else{
		user.save();
	}
}
user.userCitySelect = function(){
	
	return $( "#userCitySelect" );
	
}
user.updateCities = function(){
	$.ajax({
		  type: "GET",
		  url: "getAllCities",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			 user.userCitySelect().empty();
			 for(var i=0; i< e.data.length; i++){  
				 var option1 = document.createElement("option");
				 option1.setAttribute("value", e.data[i].name);
				 option1.innerHTML = e.data[i].name;
				 user.userCitySelect().append(option1);
			 }
			 
		  },
		  error : function(e) {
				console.log("ERROR: ", e);
			}
		});	

}
user.init = function(){
	
	user.updateCities();
	
	if (tableUser != null){
		tableUser.destroy();
	}
	tableUser = $('#tableUser').DataTable({
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
			"url" : "getAllUsers", 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			             { title :  $label.fiolong,  			className: "table-font",	data	: "name" },
			             { title :  $label.city,  			className: "table-font",	data	: "cities.name" },
			             { title :  $label.userWorkPlace, 	className: "table-font",	data	: "workplace" },
			             { title :  $label.userRole,    className: "table-font",	data	: "role" ,render : function( data ){
			            	 if (data == "DOC")  return $label.doc ;
			            	 if (data == "ADMIN") return $label.admin ;
			            	 if (data == "MANAGER")  return $label.manager ;
			             } },
			             { title :  $label.phone,    	className: "table-font text-center",	data	: "phone" },
			             { title :  $label.userLogin,   	className: "table-font text-center",	data	: "firstname" },
			             { title :  $label.userEmail,  	className: "table-font",	data	: "email" },
			             { title :  $label.change,   	className: "table-font text-center",	data	: "password", render : function( data, type, row )
			            	 {
			            	 
			            	 return '<button type="button" class="btn-danger btn-xs"  ' + 
			            		'onclick="user.warnChangePassword(\'' + row.name + '\',\'' +  row.firstname + '\',\'' + row.password + '\',\'' + row.phone + '\',\'' + row.workplace +'\',\'' + row.email + '\')">'+  $label.change +'</button>';
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
	$("#tableUser_length").removeClass("dataTables_length");
	$("#tableUser_length").addClass("col-lg-3 col-sm-3");
	
	$("#tableUser_length").children().children().addClass("filter-control");
	$("#tableUser_filter").children().children().addClass("filter-control");
		
}

user.changePassword = function(){
	var password = $("#newPasswd").val();
	if (password.length=0){
		return;
	}
	var firstname = $( "#userDelInfo").val();
	var headers = {};
	
	var data = { 
			firstname : firstname, 
			password : password
		};
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	$.ajax({
		  type: "POST",
		  url: "dropUser",
		  data: JSON.stringify(data),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
			  if (e.message == "UPDATED"){
				  tableUser.ajax.reload(null, false);
				  $( "#userDelAlert" ).addClass("hidden");
				  core.hideErrorMessage();
			  }else{
				  
				  core.showErrorMessage( $error.updatePassword);
			  }
			  
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.updatePassword );
			}
		});	
	
}
user.clear = function( id ){
	$("#userHumanNameDiv").removeClass("hidden");
	$("#userRoleSelectDiv").removeClass("hidden");
	$("#userCitySelectDiv").removeClass("hidden");
	$("#userFirstnameDiv").removeClass("hidden");
	
	$("#userHumanName" ).val("");
	$("#userFirstname").val("");
	$("#userWorkPlace").val("");
	$("#userPassword").val("");
	$("#userEmail").val("");
	$("#userPhone").val("");
	$("#userFirstname").prop('disabled', false);  
	
	user.updateCities();
	

}
user.cancel = function(){
	$( "#userDelAlert" ).addClass("hidden");
	$( "#userDelInfo").text("");
}
user.warnChangePassword = function(name, firstname,password,phone,workplace,email){
	
	if (workplace == "null"){
		workplace = "";
	}
	//$("#userHumanNameDiv").addClass("hidden");
	$("#userFirstnameDiv").addClass("hidden");
	$("#userRoleSelectDiv").addClass("hidden");
	$("#userCitySelectDiv").addClass("hidden");
	
	$("#userHumanName").val( name );
	$("#userFirstname").val( firstname );
	$("#userFirstname").prop('disabled', true);
	$("#userWorkPlace").val( workplace );
	$("#userPassword").val( password );
	$("#userEmail").val( email );
	$("#userPhone").val( phone );
	
	$("#collapse6").collapse("show");
}


