package com.asterionix.dao;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "invitation")
public class InvitationEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

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
	
/*	
	@OneToOne(optional=false)
	@JoinColumn( name="city_id", unique=false, nullable=false, updatable=false)
	private Cities city;
	@OneToOne(optional=false)
	@JoinColumn( name="doctor_id", unique=false, nullable=false, updatable=false)
	private UserEntity doctor;
	
	@OneToOne(optional=false)
	@JoinColumn( name="investigation_id", unique=false, nullable=false, updatable=false)
	private Investigation investigation;
*/	
	@ManyToOne
	@JoinColumn( name="city_id")
	private Cities city;
	@ManyToOne
	@JoinColumn( name="doctor_id")
	private UserEntity doctor;
	@ManyToOne
	@JoinColumn( name="investigation_id")
	private Investigation investigation;
	@ManyToOne
	@JoinColumn( name="status_id")
	private Status status;
	
	
	public Cities getCities() 
	{ 
		return this.city; 
	}
	public void setCity(Cities city){
		this.city = city;
	}
	public UserEntity getDoctor() 
	{ 
		return this.doctor; 
	}
	public void setDoctor(UserEntity doc){
		this.doctor = doc;
	}
	public String getManager() 
	{ 
		return this.manager; 
	}
	public void setManager(String man){
		this.manager = man;
	}
	public Investigation getInvestigation(){
		return this.investigation;
	}
	public void setInvestigation(Investigation inv){
		this.investigation = inv;
	}
	public InvitationEntity() {
		
	}
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Status getStatus() {
		return this.status;
	}
	public void setStatus(Status status) {
		this.status = status;
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
}
