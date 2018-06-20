package com.asterionix.controllers;


public class UserParams {
	private String firstname;
	private String password;
	private String humanname;
	private String role;
	private String name;
	private String phone;
	private String email;
	private String city;
	private String workplace;
	
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstName) {
		this.firstname = firstName;
	}
	public void setRole(String role){
		this.role = role;
	}
	public String getRole(){
		return this.role;
	}
	public String getName() {
		return this.name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return this.phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return this.email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCity() {
		return this.city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getHumanname() {
		return this.humanname;
	}
	public void setHumanname(String humanname) {
		this.humanname = humanname;
	}
	public String getWorkplace() {
		return this.workplace;
	}
	public void setWorkplace(String workplace) {
		this.workplace = workplace;
	}
	
	
}
