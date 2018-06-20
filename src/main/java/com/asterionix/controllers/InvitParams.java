package com.asterionix.controllers;

public class InvitParams {
	private String id;
	private String firstname;
	private String secondname;
	private String sername;
	private String phone;
	private String comments;
	private String conclusion;
	private String currentuser;
	private String investigation;
	private String status;
	private String manager;
	
	public String getId() {
		return this.id;
	}
	public void setId(String id) {
	    this.id = id;
	}
	public String getConclusion() {
		return this.conclusion;
	}
	public void setConclusion(String conclusion) {
	    this.conclusion = conclusion;
	}
	public String getManager() {
		return this.manager;
	}
	public void setManager(String manager) {
	    this.manager = manager;
	}
	
	public String getStatus() {
		return this.status;
	}
	public void setStatus(String status) {
	    this.status = status;
	}
	
	public String getInvestigation() {
		return this.investigation;
	}
	public void setInvestigation(String investigation) {
	    this.investigation = investigation;
	}
	
	public String getCurrentuser() {
		return this.currentuser;
	}
	public void setCurrentuser(String currentuser) {
	    this.currentuser = currentuser;
	}
	
	public String getFirstname() {
		return this.firstname;
	}
	public void setFirstname(String firstname) {
	    this.firstname = firstname;
	}
	public String getSecondname() {
		return this.secondname;
	}
	public void setSecondname(String secondname) {
	    this.secondname = secondname;
	}
	public String getSername() {
		return this.sername;
	}
	public void setSername(String sername) {
	    this.sername = sername;
	}
	public String getPhone() {
		return this.phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getComments() {
		return this.comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
}
