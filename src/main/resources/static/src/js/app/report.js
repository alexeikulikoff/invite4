
var report = report || {},
tableManagerReport = null;

var selectStr = '';

report.qrpicker_from = {};
report.qrpicker_to = {};

report.reportTableInvestigationSelect = function(){
	
	return $( "#reportTableInvestigationSelect");
	
}

report.investigationSelectInit = function( elem ){
	$.ajax({
		  type: "GET",
		  url: "getAllStatus",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			 elem.empty();
			 
			 var option0 = document.createElement("option");
			 option0.setAttribute("value", "selectAll");
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
report.datePickerInit = function(){
	report.qrpicker_from = jQuery('#reportTablePickerFrom').datetimepicker({
		 lang: 'ru',
			timepicker:false,
			  format:'d.m.Y',
			  onChangeDateTime:function(dp,$input){
				  manager.qrpicker_from = $input.val();
		      }					 
	});

	report.qrpicker_to = jQuery('#reportTablePickerTo').datetimepicker({
		 lang: 'ru',
		  timepicker:false,
		  format:'d.m.Y',
		  onChangeDateTime:function(dp,$input){
			  manager.qrpicker_to = $input.val();
	    }
	});
	
	$( "#reportTablePickerFrom" ).val( core.getCurrentDateShort() );
	$( "#reportTablePickerTo" ).val( core.getCurrentDateShort() );

}
report.initTable = function(date1, date2, currentUser, inv){
	
	var currentUser = $("#currentUser").val();  
	var d1 = core.dataToMysqlShort00( date1 );
	var d2 = core.dataToMysqlShort24( date2 );
	
	if (tableManagerReport != null){
		tableManagerReport.destroy();
	}
	var url;
	
	tableManagerReport = $('#tableManagerReport').DataTable({
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
		

	$("#tableManagerReport_length").removeClass("dataTables_length");
	$("#tableManagerReport_length").addClass("col-lg-2 col-sm-2");
	
	$("#tableManagerReport_length").children().children().addClass("filter-control");
	$("#tableManagerReport_filter").children().children().addClass("filter-control");
	
}
report.reportInvestigationSelect = function(){
	
	return $("#reportInvestigationSelect");
	
}
report.reportDoctorSelect = function(){
	
	return $("#reportDoctorSelect");
	
}
report.initInvestigation = function( elem ){
	
	
	$.ajax({
		  type: "GET",
		  url: "getAllInvestigation",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			 elem.empty();
			 var option0 = document.createElement("option");
			 option0.setAttribute("value", "selectAll");
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
report.initDocs = function( elem ){
	
	var currentCity = $("#currentCity").val();
	
	$.ajax({
		  type: "GET",
		  url: "getUsersByCityAndRole?cityName=" + currentCity, 
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			 elem.empty();
			 
			 var option0 = document.createElement("option");
			 option0.setAttribute("value", "selectAll");
			 option0.innerHTML = "Показать все";
			 elem.append( option0 );
			 
			 for(var i=0; i< e.data.length; i++){  
				 var option1 = document.createElement("option");
				 option1.setAttribute("value", e.data[i].id);
				 option1.innerHTML = e.data[i].name;
				 elem.append(option1);
			 }
			 
		  },
		  error : function(e) {
				console.log("ERROR: ", e);
			}
		});	

}
report.managerReportContainer = function(){
	
	return $("#managerReportContainer");
	
}


var createReportTable = function( dataSet, id){

	
	//var table = $('#' + id).DataTable();
	console.log( id );
	
	$("#" + id)
	.on('draw.dt', function(){
		//core.showWaitDialog(false);
	})
	.DataTable({
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
	 	data : dataSet,
	 	columns : [
	 	             { title	: $label.date, data: "date2", 	className: "text-left" },
		             { title	: $label.fio, data: "firstname", 	className: "text-left" , render :  function( data, type, row ){
		            	 return row.firstname + ' ' + row.secondname + ' ' + row.sername;
		             } },
		             { title	: $label.conclusion, data: "conclusion", 	className: "text-left" }
		         ],	
		iDisplayLength: 100,
	//	paging: false,
	//	info:     false,
	//	searching : false
	
		});
		
}
var createItemDiv = function(name, className, id){
	
	  var divRow = $("<div></div>");
	  divRow.addClass("row");
	  var divItemName = $("<div></div>");
	  divItemName.addClass( className );
	  divItemName.attr("id", id);
	  var pItemName = $("<p></p>");
	  pItemName.text( name );
	  divItemName.append( pItemName );
	  divRow.append( divItemName );	
	  return divRow;
}
var createInvestigationsDivs = function(data, id){

	
	 var divItemName = $("<div></div>");
	  divItemName.addClass( "col-lg-8 col-sm-8 col-lg-offset-2 col-sm-offset-2" );
	  divItemName.attr("id", "inv-"  + id );
	  var pItemName = $("<p></p>");
	  pItemName.text( name );
	  divItemName.append( pItemName );
/*	  for(var n = 0; n < data.invitations.length; n++){
		  var tb = $("<table></table");
		  tb.addClass("table table-striped  table-hover");
		  tb.attr("id", "tb-" + id );
		  divItemName.append( tb );
	  }
*/	  
	  
	  return divItemName;
}
report.createReport = function(){
	
	$("#tableManagerReportId").empty();
	
	report.managerReportContainer().empty();
	
	$("#tableManagerReportId").append('<table id="tableManagerReport"  class="table table-striped  table-hover"  ></table>');
	
	var currentUser = $("#currentUser").val();  
	var currentCity = $("#currentCity").val();
	
	var d1 = core.dataToMysqlShort00( $( "#reportTablePickerFrom" ).val() );
	var d2 = core.dataToMysqlShort00( $( "#reportTablePickerTo" ).val() );
	
	var headers = {};
	
	var query = {
			date1 : d1,
			date2 : d2,
			city : currentCity,
			doctor : report.reportDoctorSelect().val(),
			status : report.reportTableInvestigationSelect().val(),		
			investigation : report.reportInvestigationSelect().val()
	};
	
	
	headers[core.gcsrf().headerName] = core.gcsrf().token;
	var data ={};
	$.ajax({
		  type: "POST",
		  url: "createReport",
		  data: JSON.stringify(query),
		  contentType : 'application/json',
		  dataType: "json",
		  headers : headers ,    	
		  success: function(e){
		//	  core.showWaitDialog(true);
			  console.log( e );
			  for(var i=0; i < e.data.length; i++){
				  console.log( e.data[i].name );
                  var docDiv = createItemDiv( e.data[i].name, "col-lg-8 col-sm-8 docNode", "doc-" + i );
                  for(var j=0; j < e.data[i].statuses.length; j++){
                	  var statusDiv = createItemDiv( e.data[i].statuses[j].name , "col-lg-8 col-sm-8 col-lg-offset-1 col-sm-offset-1", "sta-" + i + "-" + j);
                	  for(var k=0; k < e.data[i].statuses[j].investigations.length; k++ ){
                		  var id = i + "-" + j + "-" + k;
                		
                		  
                		  var divItemName = $("<div></div>");
                		  divItemName.addClass( "col-lg-8 col-sm-8 col-lg-offset-2 col-sm-offset-2" );
                		  divItemName.attr("id", "inv-"  + id );
                		  var pItemName = $("<p></p>");
                		  pItemName.text( e.data[i].statuses[j].investigations[k].name );
                		  divItemName.append( pItemName );
                		  
                		  
                		  var id =  i + "-" + j + "-" + k ;
            			  var divInvit = $("<div></div>");
            			  divInvit.addClass( "col-lg-8 col-sm-8 col-lg-offset-1 col-sm-offset-1" );
            			  var table = $("<table></table>");
            			  table.addClass("table table-striped  table-hover");
            			  table.attr("id", "tb-"  + id );
                		  
            			  var tr0 = $("<tr></tr>");
            			 
            			  var td0 = $("<td></td>");
            			  td0.attr("colspan", 5);
            			  
            			  var size = e.data[i].statuses[j].investigations[k].invitations.length;
            			  if (size > 0){
            				  td0.text("Всего: " + size );
                			  tr0.append(td0);
                			  table.append( tr0 );
            			  }
            			
                		  for(n=0; n < size; n++){
                			
                			  var tr = $("<tr></tr>");
                			  var td1 =$("<td></td>");
                			  var firstname = e.data[i].statuses[j].investigations[k].invitations[n].firstname;
                			  var secondname = e.data[i].statuses[j].investigations[k].invitations[n].secondname;
                			  var sername = e.data[i].statuses[j].investigations[k].invitations[n].sername;
                			  td1.text( firstname + "  " + secondname + " " + sername);
                			  
                			  var td2 =$("<td></td>");
                			  td2.text( e.data[i].statuses[j].investigations[k].invitations[n].phone);
                			 
                			  var td3 =$("<td></td>");
                			  td3.text( e.data[i].statuses[j].investigations[k].invitations[n].comments);
                			  
                			  var td4 =$("<td></td>");
                			  td4.text( e.data[i].statuses[j].investigations[k].invitations[n].conclusion);
                			  
                			  var td5 =$("<td></td>");
                			  td5.text( e.data[i].statuses[j].investigations[k].invitations[n].date1);
                			  
                			  tr.append(td1);
                			  tr.append(td2);
                			  tr.append(td3);
                			  tr.append(td4);
                			  tr.append(td5);
                			  table.append(tr);
                			  
                			
                		  }
                		  divInvit.append( table );
            			  divItemName.append( divInvit );
            			  
            			  
                		//  var investigationDiv = createInvestigationsDivs( e.data[i].statuses[j].investigations[k], id );
               			  statusDiv.append( divItemName );  
                	  }
                	  docDiv.append( statusDiv );
                  }
				  report.managerReportContainer().append( docDiv );
				  
			  }
			
			
		 },
		 error : function(e) {
				console.log("ERROR: ", e);
				
			}
		});	
	
	
}
report.hideReport = function(){
	$("#managerReportContainer").empty();
}
report.init = function(){
	moment.locale('ru');
	var d2 = moment().format('L');
	var d1 = moment().subtract(1,'month').calendar();
	
	report.datePickerInit();
	
	report.initDocs( report.reportDoctorSelect() );
	report.initInvestigation( report.reportInvestigationSelect() );
	report.investigationSelectInit(report.reportTableInvestigationSelect());

	//report.initTable(d1, d2, currentUser, "NULL");
	
}

var capitalize = function( str ){
	return str.charAt(0).toUpperCase() + str.slice(1);
}
report.clear = function( id ){
		
}


manager.clearNewUser = function( data ){
	
}

