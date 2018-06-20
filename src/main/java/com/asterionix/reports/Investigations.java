package com.asterionix.reports;

import java.util.ArrayList;
import java.util.List;

public class Investigations extends Report {
	
	private List<Invitations> invitations;
	
	public Investigations(String s) {
		super(s);
		this.invitations = new ArrayList<Invitations>();
	}
	public void add(Invitations i){
		
		this.invitations.add( i );
	}
	public List<Invitations> getInvitations(){
		
		return this.invitations;
	}
	public int size(){
		return this.invitations.size();
	}
}
