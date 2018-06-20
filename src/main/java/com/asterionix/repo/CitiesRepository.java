package com.asterionix.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.asterionix.dao.Cities;

public interface CitiesRepository extends CrudRepository<Cities, Long> {
	
	public List<Cities> findAll();
	public Cities findByName(String name);
	public Cities findById(Long id);
	
	

}
