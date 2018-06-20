package com.asterionix.controllers;

public class ReportQuery {

	private String date1;
	private String date2;
	private String city;
	private String doctor;
	private String status;
	private String investigation;
	public void setDate1(String d){
		this.date1 = d;
	}
	public void setDate2(String d){
		this.date2 = d;
	}
	public void setCity(String c){
		this.city = c;
	}
	public void setDoctor(String d){
		this.doctor = d;
	}
	public void setState(String s){
		this.status = s;
	}
	public void setInvestigation(String s){
		this.investigation = s;
	}
	public String getDate1(){
		return this.date1;
	}
	public String getDate2(){
		return this.date2;
	}
	public String getCity(){
		return this.city;
	}
	public String getDoctor(){
		return this.doctor;
	}
	public String getStatus(){
		return this.status;
	}
	
	public String getInvestigation(){
		return this.investigation;
	}
}
