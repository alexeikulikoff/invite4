
var city = city || {},
	tableCity = null;

city.save = function() {

	var headers = {},
	
	fields = {
			name : $( "#cityName" )
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { name  :  fields.name.val() }
		$.ajax({
			  type: "POST",
			  url: "saveCity",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "DuplicateKeyException"){
					  core.showErrorMessage( $error.saveCity );
				  }
				  if (e.message == "SAVED"){
					  core.hideErrorMessage();
					  tableCity.ajax.reload(null, false); 
					  fields.name.val("");
					  user.updateCities();
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveCity );
				}
			});	
	}
}

city.init = function(){
	console.log("init");
	
	if (tableCity != null){
		tableCity.destroy();
	}
	tableCity = $('#tableCity').DataTable({
		"ajax": {
			"url" : "getAllCities", 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			             { title :  $label.name,   className: "table-font",	data	: "name" },
			             { title : 	$label.action, className: "table-font col-lg-1 text-center",	data	: "name",  "render" : function(data){
			            	 return '<button type="button" class="btn-danger btn-xs"  ' + 
			            		'onclick="city.warnDelagent(\'' + data +'\')"><i class="fa fa-trash" aria-hidden="true"></i></button>';
			             }  }
			         ],	
		"iDisplayLength": 75,
		"paging": false,
		"info":     false,
		"searching" : false,
		"scrollY": "650px",
        "scrollCollapse": true
		});
		
}

city.del = function(){
	var name = $( "#cityDelInfo").text();
	var headers = {};
	
	var data = { name: name };
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	$.ajax({
		  type: "POST",
		  url: "dropCity",
		  data: JSON.stringify(data),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
			  if (e.message == "DROPED"){
				  tableCity.ajax.reload(null, false);
				  $( "#cityDelAlert" ).addClass("hidden");
				  core.hideErrorMessage();
			  }else{
				  
				  core.showErrorMessage( $error.deleteCity );
			  }
			  
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.deleteCity );
			}
		});	
	
}
city.clear = function( id ){
	$( "#cityName" ).val("");
	$( "#cityNameDiv" ).removeClass("has-error");
	core.changeIcon( id );
}
city.cancel = function(){
	$( "#cityDelAlert" ).addClass("hidden");
	$( "#cityDelInfo").text("");
}
city.warnDelagent = function(data){
	
	$( "#cityDelInfo").text(data);
	$( "#cityDelAlert" ).removeClass("hidden");
	
}


