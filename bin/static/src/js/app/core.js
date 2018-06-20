/**
 * 
 */

var core = core || {},
player = null;

core.lang = null; 
core.soundPath = null;
core.recordsTotal = null;
core.mamagerHost = null;
core.agiHost = null;

core.gcsrf = function(){
	var self = this;
	self.csrfToken = ko.computed(function() {
		return JSON.parse($.ajax({
			type: 'GET',
			url: 'csrf',
			dataType: 'json',
			success: function() { },
			data: {},
			async: false,
			error: function(e){
				location.href = "/login";
			}
		}).responseText);
	}, this);
	return self.csrfToken();
}

core.onclose = function(){
	var data = {};
	$.ajax({
		  type: "POST",
		  url: "onclose",
		  data: JSON.stringify(data),
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			  console.log(e);
			 
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.connectionReset );
			}
		});	
}
core.changeIcon = function(data){
	var id = "#" + data
	if ( $( id ).hasClass("fa fa-plus-circle") ){
		$( id ).removeClass("fa fa-plus-circle");
		$( id ).addClass("fa fa-minus-circle");
		return;
	}
	if ( $( id ).hasClass("fa fa-minus-circle") ){
		$( id ).removeClass("fa fa-minus-circle");
		$( id ).addClass("fa fa-plus-circle");
		return;
	}
	
	
}
core.init = function(){
	
	
}
core.dataToMysql = function(data){
	var str = data.split(" ");
	
	var d = str[0].split(".");
	var t = str[1].split(":");
	return d[2]+ "-" + d[1] + "-" + d[0] + " " + t[0] + ":" + t[1] + ":00";
	
}
core.dataToMysqlShort00 = function(data){
	var d = data.split(".");
	return d[2]+ "-" + d[1] + "-" + d[0] + " 00:00:00";
	
}
core.dataToMysqlShort24 = function(data){
	var d = data.split(".");
	return d[2]+ "-" + d[1] + "-" + d[0] + " 23:59:59";
	
}
core.dateToTime = function( data ){
	var d1 = data.split(" ");
   	return d1[1].split("\.")[0];
}
core.dateToDay = function(data){
	var d1 = data.split(" ");
    var d2 = d1[0].split("-"); 
  	return d2[2] + "." + d2[1] + "." + d2[0];
}
core.getThisDay = function(){
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	return day;
}
core.getCurrentDate = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var hh = today.getHours();
	var ii = today.getMinutes();
	var yyyy = today.getFullYear();
	if(dd<10) {
	    dd='0'+dd
	} 
	if(mm<10) {
	    mm='0'+mm
	} 
	if (hh < 10){
		hh = '0' + hh;
	}
	if (ii < 10){
		ii = '0' + ii;
	}

	today = dd + '.'+ mm + '.' + yyyy + ' ' + hh+':'+ii;
	return today;
}
core.getCurrentDateShort = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	
	var yyyy = today.getFullYear();
	if(dd<10) {
	    dd='0'+dd
	} 
	if(mm<10) {
	    mm='0'+mm
	} 
	

	today = dd + '.'+ mm + '.' + yyyy ;
	return today;
}
core.getCurrentTime = function(){
	var today = new Date();
    return ((today.getHours() < 10)?"0":"") + today.getHours() +":"+ ((today.getMinutes() < 10)?"0":"") + today.getMinutes() +":"+ ((today.getSeconds() < 10)?"0":"") + today.getSeconds();

}

core.getAllAgents = function(elem){
	
	$.ajax({
		  type: "GET",
		  url: "getAllAgents",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			  console.log(e);
			  elem.empty();
			  var option1 = document.createElement("option");
			  option1.setAttribute("value", "All");
			  option1.innerHTML = "Select All";
			  elem.append(option1);
			  for(var i=0; i< e.data.length; i++){  
					 option1 = document.createElement("option");
					 option1.setAttribute("value", e.data[i].name);
					 option1.innerHTML = e.data[i].name;
					 elem.append(option1);
				}
		  },
		  error: function(e){
			  core.showErrorMessage( $error.getAllAgents );
		  }
	});
	
}
core.getAllQueues = function(elem){
	
	$.ajax({
		  type: "GET",
		  url: "getAllQueues",
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
		
			  elem.empty();
			  var option1 = document.createElement("option");
			  option1.setAttribute("value", "All");
			  option1.innerHTML = "Select All";
			  elem.append(option1);
			  for(var i=0; i< e.data.length; i++){  
					 option1 = document.createElement("option");
					 option1.setAttribute("value", e.data[i].name);
					 option1.innerHTML = e.data[i].name;
					 elem.append(option1);
				}
		  },
		  error: function(e){
			  core.showErrorMessage( $error.getAllQueues );
		  }
	});
	
}

core.showWaitDialog = function(show){
	if (show) {
		$("#wait_dialog").removeClass("hidden");
	}else{
	
		 $("#wait_dialog").addClass("hidden");
		
	}
	
}
core.secondsToDate = function(data){
	var minutes, seconds ,hours;
	var d1 = parseInt(data);
    if (d1 >= 60) {
    	minutes = Math.floor(d1/60);
    	if (minutes >=60){
         	hours = Math.floor(minutes/60);
         	minutes = minutes - hours * 60;  
         	seconds = d1  - hours * 3600 - minutes * 60;
         }
    	else{
    		hours = "0";
    		seconds = d1 - minutes * 60;
    	}
    }
    else{
    	minutes="0";
    	hours = "0";
    	seconds = d1;
    }
    if (seconds < 10){
		seconds = "0" + seconds;
	}
    if (minutes < 10){
		minutes = "0" + minutes;
	}
    if (hours < 10){
    	hours = "0" + hours;
	}
  return hours + ":" + minutes + ":" + seconds;
}
core.showErrorMessage = function(message){
	 $( "#errorMessage").text(message);
	 $( "#mainInfo" ).css("background", "red");
	 setTimeout( function() {
		 $( "#errorMessage").text("");
		 $( "#mainInfo" ).css("background", "black");
	 }, 3000);
	
}
core.showSaveOK = function(){
	$("#saveOK").removeClass("hidden");
	 setTimeout( function() {
		 $( "#saveOK" ).addClass("hidden");
	 }, 3000);
}
core.saveUpdateUserOK = function(){
	$("#userSaveUpdateSuccess").removeClass("hidden");
	 setTimeout( function() {
		 $( "#userSaveUpdateSuccess" ).addClass("hidden");
		 
		  $("#collapse6").collapse("hide");
		  $("#userHumanNameDiv").removeClass("hidden");
		  $("#userRoleSelectDiv").removeClass("hidden");
		  $("#userCitySelectDiv").removeClass("hidden");
		  $("#userFirstname").prop('disabled', false);
	 }, 3000);
	 
}
core.investigationSaveUpdateSuccess = function(){
	$("#investigationSaveUpdateSuccess").removeClass("hidden");
	 setTimeout( function() {
		 $( "#investigationSaveUpdateSuccess" ).addClass("hidden");
		 
		 $("#investigationID").val("");
		 $( "#investigationName" ).val( "" );
		 $("#saveInvestigationBtn").attr("onclick", "investigation.save()");
		 core.changeIcon( 'collapseInvestigationIcon' );
		 $( "#collapse5" ).collapse("hide");
	 }, 2000);
	
}

core.statusSaveUpdateSuccess = function(){
	$("#statusSaveUpdateSuccess").removeClass("hidden");
	 setTimeout( function() {
		 $("#statusSaveUpdateSuccess").addClass("hidden");
		   $( "#statusID").val("");
			$( "#statusName").val("");
			$( "#statusColor").val( "2F3E47" );
			$( "#statusUpdateBtn").attr("onclick", "status1.save()");
			core.changeIcon( 'statusCollapseIcon' );
		 $( "#collapse7" ).collapse("hide");
	 }, 2000);
	
}
core.hideErrorMessage = function(message){
	$( "#error" ).addClass("hidden");
}
core.loadQueueSelect = function(url, elementId){
	$.ajax({
		  type: "GET",
		  url : url,
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){
			
			 $( elementId ).empty();
			 for(var i=0; i< e.data.length; i++){  
				 var option1 = document.createElement("option");
				 option1.setAttribute("value", e.data[i].name);
				 option1.innerHTML = e.data[i].name;
				 $( elementId ).append(option1);
			 }
			 
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.unknown );
			}
		});	
}
core.loadAgentSelect = function( url, elementId){
	
	$.ajax({
		  type: "GET",	
		  url : url,
		  contentType : 'application/json',
		  dataType: "json",
		  success: function(e){		
			 $( elementId ).empty();
			 for(var i=0; i< e.data.length; i++){  
				 var option1 = document.createElement("option");
				 option1.setAttribute("value", e.data[i].name);
				 option1.innerHTML = e.data[i].name;
				 $( elementId ).append(option1);
			 }
			 
		  },
		  error : function(e) {
			  core.showErrorMessage( $error.unknown );
			}
		});	
	
}

core.testEmptyFields = function(obj){
	for (var property in obj) {
	    if (obj.hasOwnProperty(property)) {
	    	var errorID = obj[property].attr("id") + "Div";
	    
	    	if (obj[property].val().length == 0){
	    		$("#" + errorID ).addClass("has-error");
	    		return false;
	    	}
	    	else{
	    		$("#" + errorID ).removeClass("has-error");
	    	}
	    }
	}
	return true;
}