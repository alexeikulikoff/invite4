package com.asterionix.controllers;

import java.util.List;

public class JSONData<T>{
	
	 private List<T> data;
	
	 public JSONData(List<T> d){
		 this.data = d;
	 }
	 public List<T> getData(){
		 return this.data;
	 }
}