package com.asterionix.reports;

import java.util.ArrayList;
import java.util.List;

public class Statuses extends Report {

	private List<Investigations> investigations;
	
	public Statuses(String s) {
		super(s);
		investigations = new ArrayList<Investigations>();
	}
	public List<Investigations> getInvestigations(){
		
		return this.investigations;
	}
	public void add(Investigations inv){
		this.investigations.add( inv );
	}
	public int size(){
		return this.investigations.size();
	}
	
	
	
}
