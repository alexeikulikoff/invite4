package com.asterionix.reports;

import java.util.ArrayList;
import java.util.List;

public class Doctors extends Report {

	private List<Statuses> statuses;
	private String firstName;
	
	public Doctors(String s, String firstName) {
		super(s);
		this.firstName = firstName;
		this.statuses = new ArrayList<Statuses>();
	}
	public List<Statuses> getStatuses(){
		return this.statuses;
	}
	public void add( Statuses st){
		statuses.add( st );
	}
	public String getFirstName(){
		return this.firstName;
	}
	
	@Override
	public String toString(){
		String s = "[ name : " + name + "]" + "\n ";
		for(Statuses st : statuses ){
			s = s + "[ status:  " +  st.getName() + " ] " +  "\n";
			for(Investigations inv : st.getInvestigations()){
				s = s + "[ investigation: " + inv.getName()  + " ]\n" ;
				for(Invitations i : inv.getInvitations()){
					s = s + "[ invitations: " + i.getFirstname()  + " ]" ;
				}
			}
		}
		s = s + "\n";
		
		return s;
	}

	
}
