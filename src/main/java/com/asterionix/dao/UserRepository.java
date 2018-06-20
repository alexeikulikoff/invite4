package com.asterionix.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserRepository extends CrudRepository<UserEntity, Long> {
	UserEntity findByFirstname(String firstname);
	UserEntity findByName(String name);
	UserEntity findById(Long id);
	List<UserEntity> findAll();
	List<UserEntity> findByCity( Cities city );
	List<UserEntity> findByCityAndRole( Cities city, String role );
	@Modifying 
	@Query("UPDATE UserEntity u SET u.password = :password WHERE u.firstname = :firstname")
	void updatePassword(@Param("firstname") String firstname, @Param("password") String password);
	@Modifying 
	@Query("UPDATE UserEntity u SET u.name = :name, u.password = :password, u.phone =:phone, u.email=:email, u.workplace=:workplace WHERE u.firstname = :firstname")
	void updateUser(@Param("name") String name, @Param("firstname") String firstname, @Param("password") String password, @Param("phone") String phone, @Param("email") String email, @Param("workplace") String workplace);
	
}
