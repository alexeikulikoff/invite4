
var status1 = status1 || {},
	tableStatus = null;

status1.save = function() {

	var headers = {},
	
	fields = {
			name : $( "#statusName" )
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { 
				name  :  fields.name.val(),
				color : $("#statusColor").val()
				}
		$.ajax({
			  type: "POST",
			  url: "saveStatus",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "DuplicateKeyException"){
					  core.showErrorMessage( $error.saveStatus );
				  }
				  if (e.message == "SAVED"){
					  core.hideErrorMessage();
					  tableStatus.ajax.reload(null, false); 
					  core.statusSaveUpdateSuccess();
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage(  $error.saveStatus );
				}
			});	
	}
}

status1.update = function() {

	var headers = {},
	
	fields = {
			name : $( "#statusName" )
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = {
				id : $("#statusID").val(),
				name  :  fields.name.val(),
				color : $("#statusColor").val()
			}
		$.ajax({
			  type: "POST",
			  url: "updateStatus",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "ERROR_UPDATED"){
					  core.showErrorMessage( $error.saveStatus );
				  }
				  if (e.message == "UPDATED"){
					  core.hideErrorMessage();
					  tableStatus.ajax.reload(null, false); 
					  core.statusSaveUpdateSuccess();
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage(  $error.saveStatus );
				}
			});	
	}
}

status1.init = function(){
	
	
	if (tableStatus != null){
		tableStatus.destroy();
	}
	tableStatus = $('#tableStatus').DataTable({
		"ajax": {
			"url" : "getAllStatus", 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			             { title :  $label.name,   className: "table-font",	data	: "id" },
			             { title :  $label.name,   className: "table-font",	data	: "name" },
			             { title :  $label.color,  className: "table-font text-center",	data	: "color", render : function(data){
			            	 return '<svg width="70" height="18"><rect x="0" y="0" height="18" width="70" style="stroke: #' + data + '; fill: #' + data +'"/>' + 
		        	   		 '</svg>';
			             } },
			             { title : 	$label.action, className: "table-font col-lg-1 text-center",   "render" : function(data, type, row){
			            	 return '<button type="button" class="btn-danger btn-xs"  ' + 
			            		'onclick="status1.warnUpdate(\'' + row.id + '\',\'' + row.name + '\',\'' + row.color +'\')">' + $label.change +'</button>';
			             }  
			             
			             }
			         ],	
		"iDisplayLength": 75,
		"paging": false,
		"info":     false,
		"searching" : false,
		"scrollY": "650px",
        "scrollCollapse": true
		});
		
	tableStatus.column( 0 ).visible( false );
}
status1.setBackGroundColor = function(){
	
	$("#statusColor").val("2F3E47");
	$("#statusColor").css("background-color", "2F3E47");
	
	
}
status1.del = function(){
	var name = $( "#statusDelInfo").text();
	var headers = {};
	
	var data = { name: name };
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	$.ajax({
		  type: "POST",
		  url: "dropStatus",
		  data: JSON.stringify(data),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
			  if (e.message == "DROPED"){
				  tableStatus.ajax.reload(null, false);
				  $( "#statusDelAlert" ).addClass("hidden");
				  core.hideErrorMessage();
			  }else{
				  
				  core.showErrorMessage( $error.deleteStatus );
			  }
			  
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.deleteStatus );
			}
		});	
	
}
status1.clear = function( id ){
	$( "#statusID").val("");
	$( "#statusName").val("");
	$( "#statusColor").val( "2F3E47" );
	$( "#statusUpdateBtn").attr("onclick", "status1.save()");
	core.changeIcon( 'statusCollapseIcon' );
}
status1.cancel = function(){
	$( "#statusDelAlert" ).addClass("hidden");
	$( "#statusDelInfo").text("");
}
status1.warnUpdate = function(id, name, color){
	
	$( "#statusID").val(id);
	$( "#statusName").val(name);
	$( "#statusColor").val( color );
	$( "#statusUpdateBtn").attr("onclick", "status1.update()");
	core.changeIcon( 'statusCollapseIcon' );
	$( "#collapse7" ).collapse("show");
	
}


