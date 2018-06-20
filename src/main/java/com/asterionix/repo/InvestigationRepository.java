package com.asterionix.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.asterionix.dao.Cities;
import com.asterionix.dao.Investigation;

@Transactional
public interface InvestigationRepository extends CrudRepository<Investigation, Long> {
	
	public List<Investigation> findAll();
	public Investigation findByName(String name);
	public Investigation findById(Long id);
	@Modifying 
	@Query("UPDATE Investigation i SET i.name = :name WHERE i.id = :id")
	void updateName(@Param("id") Long id, @Param("name") String name);
	

}
