
var docinvit = docinvit || {},
	tableDocInvit = null;

docinvit.qrpicker_from = {};
docinvit.qrpicker_to = {};

docinvit.save = function() {

	var headers = {},
	
	fields = {
			firstname :   $( "#docinvitFirstName" ),
			secondname :  $( "#docinvitSecondName" ),
			sername : 	  $( "#docinvitSerName" ),
			phone : 	  $( "#docinvitPhone" ),
			invest : 	  $( "#docinvitInvestigationSelect" ),
			comments :    $( "#docinvitComments" )
			
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { 
				firstname  	  :	fields.firstname.val(),
				secondname 	  :	fields.secondname.val(),
				sername 	  :	fields.sername.val(),
				phone 		  :	fields.phone.val(),
				investigation : fields.invest.val(),
				comments 	  : fields.comments.val(),
				currentuser   : $( "#currentUser" ).val()  
		}
		
		$.ajax({
			  type: "POST",
			  url: "saveDocInvit",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "DuplicateKeyException"){
					  core.showErrorMessage( $error.saveDocInvit );
				  }
				  if (e.message == "SAVED"){
					  core.hideErrorMessage();
					  
					  //tableDocInvit.ajax.reload(null, false);
					  
					  moment.locale('ru');
					  var d2 = moment().format('L');
					  var d1 = moment().subtract(1,'month').calendar();
					  docinvit.initTable(d1, d2, currentUser, "NULL"); 
					  
					  fields.firstname.val("");
					  fields.secondname.val("");
					  fields.sername.val("");
					  fields.phone.val("");
					  fields.comments.val("");
					  core.showSaveOK();
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveDocInvit );
				}
			});	
	}
}

docinvit.docinvitInvestigationSelect = function(){
	
	return $( "#docinvitInvestigationSelect" );
	
}
docinvit.docTableInvestigationSelect = function(){
	return $( "#docTableInvestigationSelect");
}
docinvit.statusSelect = function( elem ){
	$.ajax({
		  type: "GET",
		  url: "getAllStatus",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			 elem.empty();
			 var option0 = document.createElement("option");
			 option0.setAttribute("value", "NULL");
			 option0.innerHTML = "Показать все";
			 elem.append( option0 );
			 for(var i=0; i< e.data.length; i++){  
				 var option1 = document.createElement("option");
				 option1.setAttribute("value", e.data[i].name);
				 option1.innerHTML = e.data[i].name;
				 elem.append(option1);
			 }
			 
		  },
		  error : function(e) {
				console.log("ERROR: ", e);
			}
		});	

}

docinvit.docinvitInvestigationSelectInit = function( elem ){
	$.ajax({
		  type: "GET",
		  url: "getAllInvestigation",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			 elem.empty();
			 for(var i=0; i< e.data.length; i++){  
				 var option1 = document.createElement("option");
				 option1.setAttribute("value", e.data[i].name);
				 option1.innerHTML = e.data[i].name;
				 elem.append(option1);
			 }
			 
		  },
		  error : function(e) {
				console.log("ERROR: ", e);
			}
		});	

}
docinvit.datePickerInit = function(){
	docinvit.qrpicker_from = jQuery('#docTablePickerFrom').datetimepicker({
		 lang: 'ru',
			timepicker:false,
			  format:'d.m.Y',
			  onChangeDateTime:function(dp,$input){
				  docinvit.qrpicker_from = $input.val();
		      }					 
	});

	docinvit.qrpicker_to = jQuery('#docTablePickerTo').datetimepicker({
		 lang: 'ru',
		  timepicker:false,
		  format:'d.m.Y',
		  onChangeDateTime:function(dp,$input){
			  docinvit.qrpicker_to = $input.val();
	    }
	});
	
	$( "#docTablePickerFrom" ).val( core.getCurrentDateShort() );
	$( "#docTablePickerTo" ).val( core.getCurrentDateShort() );

}
docinvit.initTable = function(date1, date2, currentUser, inv){
	
	var currentUser = $("#currentUser").val();  
	var d1 = core.dataToMysqlShort00( date1 );
	var d2 = core.dataToMysqlShort24( date2 );
	
	if (tableDocInvit != null){
		tableDocInvit.destroy();
	}
	var url;
	
	tableDocInvit = $('#tableDocInvit').DataTable({
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
			"url" : "getDocInvitByUser?name=" + currentUser +"&date1=" + d1 + "&date2=" + d2 + "&inv=" + inv , 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			             { title :  $label.fio,  		className: "table-font", render : function( data, type, row){
			            	 return capitalize(row.firstname) + " " + capitalize(row.secondname) + " " + capitalize(row.sername);
			             } },
			             { title :  $label.phone,  		className: "table-font text-center",	data	: "phone" },
			             { title :  $label.date,  		className: "table-font text-center",	data	: "date1" , render: function(data){
			            	 return data.split(" ")[0];
			             } },
			             { title :  $label.status,   	className: "table-font  text-center",	data	: "status.name"},
			            
			             { title :  $label.investig,   	className: "table-font  text-center",	data	: "investigation.name" },
			             
			             { title :  $label.conclusion,  className: "table-font",	data	: "conclusion" },
			/*             { title :  $label.date, 	    className: "table-font  text-center",	data	: "date2" , render: function(data){
			            	 return data.split(" ")[0];
			             } },
*/			             
			             { title :  $label.manager,   	className: "table-font",	data	: "manager" }
			         ],	
		"iDisplayLength": 25,
		"searching" : true,
		//"scrollY": "950px",
		"scrollX": "320px",
        "scrollCollapse": true,
        createdRow: function(row, data, index) {
        	
        	$(row).attr("style", "background-color : #" + data.status.color + " !important");
            
        },
        rowCallback: function(row, data, index) {
        	
        	$(row).attr("style", "background-color : #" + data.status.color + " !important");
        	
        }

		});

	$("#tableDocInvit_length").removeClass("dataTables_length");
	$("#tableDocInvit_length").addClass("col-lg-3 col-sm-3");
	
	$("#tableDocInvit_length").children().children().addClass("filter-control");
	$("#tableDocInvit_filter").children().children().addClass("filter-control");
	
}
docinvit.init = function(){
	moment.locale('ru');
	var d2 = moment().format('L');
	var d1 = moment().subtract(3,'month').calendar();
	docinvit.datePickerInit();
	
	docinvit.docinvitInvestigationSelectInit( docinvit.docinvitInvestigationSelect() );
	//docinvit.docinvitInvestigationSelectInit( docinvit.docTableInvestigationSelect() );
	docinvit.statusSelect( docinvit.docTableInvestigationSelect() );

	docinvit.initTable(d1, d2, currentUser, "NULL"); 
		
}
docinvit.updateFilter = function(){
	var d1 = $("#docTablePickerFrom").val();
	var d2 = $("#docTablePickerTo").val();
	var inv = $("#docTableInvestigationSelect").val();
	docinvit.initTable(d1, d2, currentUser, inv); 
	
}
var capitalize = function( str ){
	return str.charAt(0).toUpperCase() + str.slice(1);
}
docinvit.clear = function( id ){
	$( "#docinvitFirstName" ).val("");
	$( "#docinvitSecondName" ).val("");
	$( "#docinvitSerName" ).val("");
	$( "#docinvitPhone" ).val("");
	$( "#docinvitComments" ).val("");
	
	$( "#docinvitFirstNameDiv" ).removeClass("has-error");
	$( "#docinvitSecondNameDiv" ).removeClass("has-error");
	$( "#docinvitSerNameDiv" ).removeClass("has-error");
	$( "#docinvitPhoneDiv" ).removeClass("has-error");
	$( "#docinvitCommentsDiv" ).removeClass("has-error");
	
	if ($("#invClear").text() == "Новое направление"){
		$("#invClear").text("Скрыть");
		return;
	}
	if ($("#invClear").text() == "Скрыть"){
		$("#invClear").text("Новое направление");
		return;
	}
	
}
docinvit.changeButtonName = function(){
	
	if ($("#docTableFilter").text() == $label.show){
		$("#docTableFilter").text( $label.hide );
		return;
	}
	if ($("#docTableFilter").text() == $label.hide){
		$("#docTableFilter").text( $label.show );
		return;
	}
}
var changeActive = function(id){
	if ($( id ).hasClass("active")){
		$( id ).removeClass("active");
		return;
		
	}
	if (!$( id ).hasClass("active")){
		$( id ).addClass("active");
		return;
		
	}
}
docinvit.dateSelect = function(data){
	var id = "#" + data;
	
	$("button").each(function( index ){
		if (this.id.startsWith("date")){
			console.log(this.id);
			if (this.id != data){
				$("#" + this.id).removeClass("active");
			}else{
				
				changeActive(id);
			} 
		}
	});
	
	
}



