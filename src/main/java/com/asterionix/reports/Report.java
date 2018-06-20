package com.asterionix.reports;

abstract class Report {
	protected String name ;
	public Report(String s){
		this.name = s;
	}
	public String getName(){
		return this.name;
	}
}
