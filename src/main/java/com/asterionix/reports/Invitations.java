package com.asterionix.reports;

import com.asterionix.dao.Status;

public class Invitations {
	private String firstname;
	private String secondname;
	private String sername;
	private String phone;
	private String birth;
	private String date1 ;
	private String date2 ;
	private String conclusion;
	private String comments;
	private String manager;
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

	public String getBirth() {
		return this.birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getDate1() {
		return this.date1;
	}
	public void setDate1(String date1) {
		this.date1 = date1;
	}
	public String getDate2() {
		return this.date2;
	}
	public void setDate2(String date2) {
		this.date2 = date2;
	}
	public String getConclusion() {
		return this.conclusion;
	}
	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
	}
	public String getComments() {
		return this.comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getManager() {
		return this.manager;
	}
	public void setManager(String s) {
		this.manager = s;
	}
}
