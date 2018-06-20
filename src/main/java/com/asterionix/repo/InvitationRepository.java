package com.asterionix.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.asterionix.dao.Cities;
import com.asterionix.dao.Investigation;
import com.asterionix.dao.InvitationEntity;
import com.asterionix.dao.Status;
import com.asterionix.dao.UserEntity;

@Transactional
public interface InvitationRepository extends CrudRepository<InvitationEntity, Long>{

	List<InvitationEntity> findAll();
	List<InvitationEntity> findByDoctorAndDate1Between(UserEntity doc, String date1, String date2);
	List<InvitationEntity> findByDoctorAndInvestigationAndDate1Between(UserEntity doc, Investigation inv, String date1, String date2);
	List<InvitationEntity> findByDoctorAndStatusAndDate1Between(UserEntity doc, Status inv, String date1, String date2);
	
	
	List<InvitationEntity> findByCityAndStatusAndDate1Between(Cities city, Status inv, String date1, String date2);
	List<InvitationEntity> findByCityAndStatusAndDoctorAndInvestigationAndDate1Between(Cities city, Status status, UserEntity doc, Investigation inv, String date1, String date2);
	List<InvitationEntity> findByCityAndDate1BetweenOrderByDoctor(Cities city, String date1, String date2);
	List<InvitationEntity> findByCityAndDate1Between(Cities city, String date1, String date2);
	List<InvitationEntity> findByStatusAndDate1Between(Status inv,String date1, String date2);
	@Modifying 
	@Query("UPDATE InvitationEntity i SET i.conclusion = :conclusion, i.status =:status, i.manager=:manager, i.date2=:date2 WHERE i.id = :id")
	void updateInvitation(@Param("id") Long id, @Param("conclusion") String conclusion, @Param("status") Status status, 
			@Param("manager") String manager, @Param("date2") String date2 );
	
	
}
