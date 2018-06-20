package com.asterionix.repo;

import java.util.ArrayList;
import java.util.List;

import com.asterionix.controllers.ReportQuery;
import com.asterionix.dao.Cities;
import com.asterionix.dao.Investigation;
import com.asterionix.dao.InvitationEntity;
import com.asterionix.dao.Status;
import com.asterionix.dao.UserEntity;
import com.asterionix.dao.UserRepository;
import com.asterionix.reports.Doctors;
import com.asterionix.reports.Investigations;
import com.asterionix.reports.Invitations;
import com.asterionix.reports.Statuses;

public class ServiceInvitationRepo {
	
	private InvitationRepository repository;
	private CitiesRepository citiesRepository;
	private UserRepository usersRepository;
	private StatusRepository statusRepository;
	private InvestigationRepository investigationRepository;
	
	
	public ServiceInvitationRepo( InvitationRepository repo, CitiesRepository citiesRepository, UserRepository usersRepository,
			StatusRepository statusRepository, InvestigationRepository investigationRepository ){
		this.repository = repo;
		this.citiesRepository = citiesRepository;
		this.usersRepository = usersRepository;
		this.statusRepository = statusRepository;
		this.investigationRepository = investigationRepository;
	}
	
	public List<Doctors> findBy(ReportQuery reportQuery){
		
		Cities city = citiesRepository.findByName(reportQuery.getCity());
		List<UserEntity> doctorsAll = usersRepository.findByCityAndRole( city, "DOC" );
		List<Status> satusAll = statusRepository.findAll();
		List<Investigation> investigationAll = investigationRepository.findAll();

		List<Doctors> doctors = new ArrayList<Doctors>();
		for(UserEntity u : doctorsAll){
			Doctors doctor = new Doctors(u.getName(),u.getFirstname());
			for(Status s : satusAll){
				Statuses statuses = new Statuses(s.getName());
				for(Investigation i : investigationAll ){
					Investigations investigation = new Investigations(i.getName());
					List<InvitationEntity> invitations = 
					repository.findByCityAndStatusAndDoctorAndInvestigationAndDate1Between(city, s, u, i, reportQuery.getDate1(), reportQuery.getDate2());
					for(InvitationEntity inv : invitations){
						Invitations invitationsActive = new Invitations();
						invitationsActive.setFirstname( inv.getFirstname());
						invitationsActive.setSecondname(inv.getSecondname());
						invitationsActive.setSername(inv.getSername());
						invitationsActive.setPhone(inv.getPhone());
						invitationsActive.setDate1(inv.getDate1());
						invitationsActive.setDate2(inv.getDate2());
						invitationsActive.setComments(inv.getComments());
						invitationsActive.setConclusion(inv.getConclusion());
						investigation.add( invitationsActive );
					}
					if (investigation.size() > 0){
						statuses.add( investigation );
					}
				}
				if (statuses.size() > 0){
					doctor.add(statuses);
				}
				
			}
			doctors.add( doctor );
		}
		return doctors;
	}
	public List<Doctors> findByDoctor(ReportQuery reportQuery){
		
		Cities city = citiesRepository.findByName(reportQuery.getCity());
		
		Long id = Long.parseLong( reportQuery.getDoctor());
		
		UserEntity doctorsAll = usersRepository.findById(id);
		
		List<Status> satusAll = statusRepository.findAll();
		List<Investigation> investigationAll = investigationRepository.findAll();

		List<Doctors> doctors = new ArrayList<Doctors>();
		
			Doctors doctor = new Doctors(doctorsAll.getName(),doctorsAll.getFirstname());
			for(Status s : satusAll){
				Statuses statuses = new Statuses(s.getName());
				for(Investigation i : investigationAll ){
					Investigations investigation = new Investigations(i.getName());
					List<InvitationEntity> invitations = 
					repository.findByCityAndStatusAndDoctorAndInvestigationAndDate1Between(city, s, doctorsAll, i, reportQuery.getDate1(), reportQuery.getDate2());
					for(InvitationEntity inv : invitations){
						Invitations invitationsActive = new Invitations();
						invitationsActive.setFirstname( inv.getFirstname());
						invitationsActive.setSecondname(inv.getSecondname());
						invitationsActive.setSername(inv.getSername());
						invitationsActive.setPhone(inv.getPhone());
						invitationsActive.setDate1(inv.getDate1());
						invitationsActive.setDate2(inv.getDate2());
						invitationsActive.setComments(inv.getComments());
						invitationsActive.setConclusion(inv.getConclusion());
						investigation.add( invitationsActive );
					}
					if (investigation.size() > 0){
						statuses.add( investigation );
					}
				}
				if (statuses.size() > 0){
					doctor.add(statuses);
				}
				
			}
			doctors.add( doctor );
	
		return doctors;
	}

	public List<Doctors> findByStatus(ReportQuery reportQuery){
		
		Cities city = citiesRepository.findByName(reportQuery.getCity());
		List<UserEntity> doctorsAll = usersRepository.findByCityAndRole( city, "DOC" );
		Status satusAll = statusRepository.findByName(reportQuery.getStatus());
		List<Investigation> investigationAll = investigationRepository.findAll();

		List<Doctors> doctors = new ArrayList<Doctors>();
		for(UserEntity u : doctorsAll){
			Doctors doctor = new Doctors(u.getName(),u.getFirstname());
		
				Statuses statuses = new Statuses(satusAll.getName());
				for(Investigation i : investigationAll ){
					Investigations investigation = new Investigations(i.getName());
					List<InvitationEntity> invitations = 
					repository.findByCityAndStatusAndDoctorAndInvestigationAndDate1Between(city, satusAll, u, i, reportQuery.getDate1(), reportQuery.getDate2());
					for(InvitationEntity inv : invitations){
						Invitations invitationsActive = new Invitations();
						invitationsActive.setFirstname( inv.getFirstname());
						invitationsActive.setSecondname(inv.getSecondname());
						invitationsActive.setSername(inv.getSername());
						invitationsActive.setPhone(inv.getPhone());
						invitationsActive.setDate1(inv.getDate1());
						invitationsActive.setDate2(inv.getDate2());
						invitationsActive.setComments(inv.getComments());
						invitationsActive.setConclusion(inv.getConclusion());
						investigation.add( invitationsActive );
					}
					if (investigation.size() > 0){
						statuses.add( investigation );
					}
				}
				if (statuses.size() > 0){
					doctor.add(statuses);
				}
			doctors.add( doctor );
		}
		return doctors;
	}
	
	
	public List<Doctors> findByInvestigation(ReportQuery reportQuery){
		Cities city = citiesRepository.findByName(reportQuery.getCity());
		List<UserEntity> doctorsAll = usersRepository.findByCityAndRole( city, "DOC" );
		List<Status> satusAll = statusRepository.findAll();
		Investigation investigationAll = investigationRepository.findByName(reportQuery.getInvestigation());

		List<Doctors> doctors = new ArrayList<Doctors>();
		for(UserEntity u : doctorsAll){
			Doctors doctor = new Doctors(u.getName(),u.getFirstname());
			for(Status s : satusAll){
				Statuses statuses = new Statuses(s.getName());
				
					Investigations investigation = new Investigations(investigationAll.getName());
					List<InvitationEntity> invitations = 
					repository.findByCityAndStatusAndDoctorAndInvestigationAndDate1Between(city, s, u, investigationAll, reportQuery.getDate1(), reportQuery.getDate2());
					for(InvitationEntity inv : invitations){
						Invitations invitationsActive = new Invitations();
						invitationsActive.setFirstname( inv.getFirstname());
						invitationsActive.setSecondname(inv.getSecondname());
						invitationsActive.setSername(inv.getSername());
						invitationsActive.setPhone(inv.getPhone());
						invitationsActive.setDate1(inv.getDate1());
						invitationsActive.setDate2(inv.getDate2());
						invitationsActive.setComments(inv.getComments());
						invitationsActive.setConclusion(inv.getConclusion());
						investigation.add( invitationsActive );
					}
					if (investigation.size() > 0){
						statuses.add( investigation );
					}
				if (statuses.size() > 0){
					doctor.add(statuses);
				}
				
			}
			doctors.add( doctor );
		}
		return doctors;
	}
}
