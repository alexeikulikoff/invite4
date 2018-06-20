
var manager = manager || {},
	tableManager = null;

var selectStr = '';

manager.qrpicker_from = {};
manager.qrpicker_to = {};

manager.save = function( id ) {

	var headers = {},
	
	fields = {
			conclusion :    $( "#managerComments_" + id )
			};
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	
	if (core.testEmptyFields(fields)){
		var data = { 
				manager 	: $( "#currentUser" ).val(),
				id 			: id,
				conclusion 	: $( "#managerComments_" + id ).val(),
				status 		: $( "#managerStatus_" + id).val()
		}
		$.ajax({
			  type: "POST",
			  url: "updateManagerInvitation",
			  data: JSON.stringify(data),
			  contentType : 'application/json',
			  dataType: "json",
			  headers : headers ,    	
			  success: function(e){
				  if (e.message == "ERROR_UPDATE"){
					  core.showErrorMessage( $error.saveDocInvit );
				  }
				  if (e.message == "UPDATED"){
					  tableManager.ajax.reload();
					  core.hideErrorMessage();
					 console.log("updated");
				  }
			  },
			  error : function(e) {
				  core.showErrorMessage( $error.saveDocInvit );
				}
			});	
	}
}


manager.managerTableInvestigationSelect = function(){
	
	return $( "#managerTableInvestigationSelect");
	
}

manager.managerInvestigationSelectInit = function( elem ){
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
manager.datePickerInit = function(){
	manager.qrpicker_from = jQuery('#managerTablePickerFrom').datetimepicker({
		 lang: 'ru',
			timepicker:false,
			  format:'d.m.Y',
			  onChangeDateTime:function(dp,$input){
				  manager.qrpicker_from = $input.val();
		      }					 
	});

	manager.qrpicker_to = jQuery('#manegerTablePickerTo').datetimepicker({
		 lang: 'ru',
		  timepicker:false,
		  format:'d.m.Y',
		  onChangeDateTime:function(dp,$input){
			  manager.qrpicker_to = $input.val();
	    }
	});
	
	$( "#managerTablePickerFrom" ).val( core.getCurrentDateShort() );
	$( "#manegerTablePickerTo" ).val( core.getCurrentDateShort() );

}
manager.initTable = function(date1, date2, currentUser, inv){
	
	var currentUser = $("#currentUser").val();  
	var d1 = core.dataToMysqlShort00( date1 );
	var d2 = core.dataToMysqlShort24( date2 );
	
	if (tableManager != null){
		tableManager.destroy();
	}
	var url;
	
	tableManager = $('#tableManager').DataTable({
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
			"url" : "getDocInvitByCity?name=" + currentUser +"&date1=" + d1 + "&date2=" + d2 + "&inv=" + inv , 
       		"type": "GET",
            "dataSrc": "data",
            "error": function(){
            
            	console.log("data loading...");
            	}
			},
			"columns": [
			           
			             { title :  $label.fio,  		className: "table-font col-lg-2", render : function( data, type, row){
			            	 return capitalize(row.firstname) + " " + capitalize(row.secondname) + " " + capitalize(row.sername);
			             } },
			             { title :  $label.phone,  		className: "table-font text-center",	data	: "phone" ,render : function( data,  type, row ){
			            	 var fio = capitalize(row.firstname) + " " + capitalize(row.secondname) + " " + capitalize(row.sername);
			            	 return '<button type="button" class="btn-primary" data-toggle="modal" data-target="#modalPhone" ' + 
			            		'onclick="manager.zoomPhone(\'' + data + '\',\'' + fio +  '\')">' + data +'</button>'; 
			             } },
			             { title :  $label.date,  		className: "table-font text-center",	data	: "date1" , render: function(data){
			            	 return data.split(" ")[0];
			             } },
			             { title :  $label.investig,   	className: "table-font  text-center",	data	: "investigation.name" },
			             { title :  $label.comments,   	className: "table-font  text-center",	data	: "comments" },
			             { title :  $label.status,   	className: "table-font  text-center",	data	: "status.name"},
			             { title :  $label.conclusion,  className: "table-font col-lg-4",	data	: "conclusion" },
			/*             { title :  $label.date, 	    className: "table-font  text-center",	data	: "date2" , render: function(data){
			            	 return data.split(" ")[0];
			             } },
*/			             
			             { title :  $label.manager,   	className: "table-font",	data	: "manager" },
			             { title :  $label.date,   	className: "table-font",	data	: "date2" },
			             { title :  $label.change,  	className: "table-font text-center",	data	: "id" ,render : function(data, type, row)
			            	 {
			            	    return '<button id="managerUpdateBtn_' + data +  '" type="button" class="btn-danger btn-xs"  ' + 
				            		'onclick="manager.warnChange(\'' + data + '\')">'+  $label.change +'</button>';
				            	  	 
				             }	 
			             },
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
		

	$("#tableManager_length").removeClass("dataTables_length");
	$("#tableManager_length").addClass("col-lg-2 col-sm-2");
	
	$("#tableManager_length").children().children().addClass("filter-control");
	$("#tableManager_filter").children().children().addClass("filter-control");
	
}

manager.zoomPhone = function(phone, fio){
	
	$("#phoneValue").text( phone );
	$("#phoneHeader").text( fio );
}
manager.init = function(){
	moment.locale('ru');
	var d2 = moment().format('L');
	var d1 = moment().subtract(1,'month').calendar();
	
	manager.datePickerInit();
	
	manager.managerInvestigationSelectInit(manager.managerTableInvestigationSelect());

	manager.initTable(d1, d2, currentUser, "NULL");
	
}
manager.updateFilter = function(){
	
	var d1 = $("#managerTablePickerFrom").val();
	var d2 = $("#manegerTablePickerTo").val();
	var inv = $("#managerTableInvestigationSelect").val();
	manager.initTable(d1, d2, currentUser, inv); 
	
}
var capitalize = function( str ){
	return str.charAt(0).toUpperCase() + str.slice(1);
}
manager.clear = function( id ){
		
}
manager.statusInit = function(){
	var str='';
	$("#managerTableInvestigationSelect").children().each( function( index, value ){
		if ($(value).attr("value")!='NULL'){
			str = str + '<option value="' + $(value).attr("value") +'" >' +  $(value).text() + '</option>';
		}
	});
	return str;
}
manager.editTemplate = function(data){
	
    var str = '<form role="form">'+
    '<div class="row">'+
     '<div class="col-lg-9 col-lg-offset-3">'+
       '<div  class="form-group">'+
            '<div  class="col-lg-6">'+  
             '<label class="control-label" >' +  $label.conclusion + '</label>'+
            	'<div class="input-group">'+
                '<span  class="input-group-addon"><i class="fa fa-user-plus" aria-hidden="true"></i></span>'+
                '<textarea class="form-control" rows="3" id="managerComments_' + data +'"></textarea>'+
               '</div>'+ 
               '<br/>'+   
             '</div>'+ 
            '<div   class="col-lg-3">'+     
              '<label class="control-label" >' + $label.status + '</label>'+
              '<div class="input-group">'+
               '<span  class="input-group-addon"><i class="fa fa-share-alt" aria-hidden="true"></i></span>'+
               ' <select id="managerStatus_' + data +'" class="form-control" >'+ manager.statusInit()  + 
                '</select>'+
               '</div>'+ 
          '</div>'+
         '<div  id="btnManagerUpdate" class="col-lg-3">'+ 
           '<label class="control-label" >&nbsp;</label>'+
              '<div class="input-group">'+
              '<button id="managerSaveUpdateBtn_' + data + '" onclick= "manager.managerSaveUpdate(\'' + data + '\')"  type="button" class="btn btn-primary">'+ $button.save + '</button>'+
               '</div>'+ 
          '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+  
 '</form>';
	
	 
    return str;

}

manager.managerSaveUpdate = function( data ){
	manager.save(data);
}

manager.warnChange = function(data){

	manager.statusInit();
	
	tableManager.rows().eq(0).each(function(index) {
       if (tableManager.row(index).data().id == data) {
    	   
    	    var tr = tableManager.row( index ).node();
    	    var row = tableManager.row( tr );
    	    row.child( $( manager.editTemplate( data )) ).show();
    	    'onclick="manager.warnChange(\'' + data +  '\')">'
    	    $("#managerUpdateBtn_" + data).attr("onclick","manager.warnCansel('" + data + "')" );
    	    $("#managerUpdateBtn_" + data).text( $button.cansel );
        }
     });
}

manager.warnCansel = function( data ){
	console.log("cansel");
	tableManager.rows().eq(0).each(function(index) {
	       if (tableManager.row(index).data().id == data) {
	    	    var tr = tableManager.row( index ).node();
	    	    var row = tableManager.row( tr );
	    	    row.child.remove();
	        }
	     });
	   $("#managerUpdateBtn_" + data).attr("onclick","manager.warnChange('" + data + "')" );
	   $("#managerUpdateBtn_" + data).text( $label.change );
}

manager.clearNewUser = function( data ){
	
}

