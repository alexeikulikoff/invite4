
var investigation = investigation || {},
	tableInvestigation = null;

investigation.save = function() {

	var headers = {},
	
	fields = {
			name : $( "#investigationName" )
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { name  :  fields.name.val() }
		$.ajax({
			  type: "POST",
			  url: "saveInvestigation",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "DuplicateKeyException"){
					  core.showErrorMessage( $error.saveInvestigation );
				  }
				  if (e.message == "SAVED"){
					  core.investigationSaveUpdateSuccess();
					  core.hideErrorMessage();
					  tableInvestigation.ajax.reload(null, false); 
					  
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveInvestigation );
				}
			});	
	}
}

investigation.update = function() {

	var headers = {},
	
	fields = {
			
			name : $( "#investigationName" )
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = {
				id : $("#investigationID").val(),
				name  :  fields.name.val()
		}
		$.ajax({
			  type: "POST",
			  url: "updateInvestigation",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "ERROR_UPDATE"){
					  core.showErrorMessage( $error.saveInvestigation );
				  }
				  if (e.message == "UPDATED"){
					  core.hideErrorMessage();
					  core.investigationSaveUpdateSuccess();
					  tableInvestigation.ajax.reload(null, false); 
					 
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveInvestigation );
				}
			});	
	}
}

investigation.init = function(){
	
	
	if (tableInvestigation != null){
		tableInvestigation.destroy();
	}
	tableInvestigation = $('#tableInvestigation').DataTable({
		 "language": {
			  "processing": "Подождите...",
			  "search": "Поиск:  ",
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
			"url" : "getAllInvestigation", 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			             { title :  $label.name,   className: "table-font",	data	: "id" },
			             { title :  $label.name,   className: "table-font",	data	: "name" },
			             { title : 	$label.action, className: "table-font  col-lg-1 text-center",	data	: "name",  "render" : function(data,type,row){
			            	 return '<button type="button" class="btn-danger btn-xs"  ' + 
			            		'onclick="investigation.warnChangeName(\'' + row.id + '\',\'' + row.name +'\')">' + $label.change +'</button>';
			             }  
			             
			             }
			         ],	
		"iDisplayLength": 50,
		"scrollY": "650px",
        "scrollCollapse": true
		});
	
	tableInvestigation.column( 0 ).visible( false );
	
	$("#tableInvestigation_length").removeClass("dataTables_length");
	$("#tableInvestigation_length").addClass("col-lg-4 col-sm-4");
	
	$("#tableInvestigation_length").children().children().addClass("filter-control");
	$("#tableInvestigation_filter").children().children().addClass("filter-control");
		
}

investigation.del = function(){
	var name = $( "#investigationDelInfo").text();
	var headers = {};
	
	var data = { name: name };
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	$.ajax({
		  type: "POST",
		  url: "dropInvestigation",
		  data: JSON.stringify(data),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
			  if (e.message == "DROPED"){
				  tableInvestigation.ajax.reload(null, false);
				  $( "#investigationDelAlert" ).addClass("hidden");
				  core.hideErrorMessage();
			  }else{
				  
				  core.showErrorMessage( $error.deleteInvestigation);
			  }
			  
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.deleteInvestigation );
			}
		});	
	
}
investigation.clear = function( id ){
	$( "#investigationName" ).val("");
	$( "#investigationNameDiv" ).removeClass("has-error");
	$("#saveInvestigationBtn").attr("onclick", "investigation.save()");
	core.changeIcon( id );
}
investigation.cancel = function(){
	$( "#investigationDelAlert" ).addClass("hidden");
	$( "#investigationDelInfo").text("");
}
investigation.warnChangeName = function(id,name){
	$("#investigationID").val(id);
	$( "#investigationName" ).val( name );
	$("#saveInvestigationBtn").attr("onclick", "investigation.update()");
	core.changeIcon( 'collapseInvestigationIcon' );
	$( "#collapse5" ).collapse("show");
	
}



