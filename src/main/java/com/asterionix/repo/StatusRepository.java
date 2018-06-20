package com.asterionix.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.asterionix.dao.Status;

@Transactional
public interface StatusRepository  extends CrudRepository<Status, Long>{
	
	List<Status> findAll();
	Status findById(Long id);
	Status findByName(String name);
	@Modifying 
	@Query("UPDATE Status s SET s.name = :name, s.color=:color WHERE s.id = :id")
	void updateStatus(@Param("id") Long id, @Param("name") String name, @Param("color") String color);
	
}
