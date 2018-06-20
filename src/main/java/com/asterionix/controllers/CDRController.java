package com.asterionix.controllers;


import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.asterionix.dao.Cities;
import com.asterionix.dao.Investigation;
import com.asterionix.dao.InvitationEntity;
import com.asterionix.dao.Status;
import com.asterionix.dao.UserEntity;
import com.asterionix.dao.UserRepository;
import com.asterionix.repo.CitiesRepository;
import com.asterionix.repo.InvestigationRepository;
import com.asterionix.repo.InvitationRepository;
import com.asterionix.repo.ServiceInvitationRepo;
import com.asterionix.repo.StatusRepository;
import com.asterionix.reports.Doctors;
import com.asterionix.security.CustomUserDetails;

@Controller
public class CDRController {
	
	static Logger logger = LoggerFactory.getLogger(CDRController.class);
	
	@Autowired 
	private CitiesRepository citiesRepository;
	@Autowired
	private InvestigationRepository investigationRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StatusRepository statusRepository;
	@Autowired
	private InvitationRepository invitationRepository;

	
	public CDRController() {
		super();
	}
	
	private class TitleInfo{
		private String status;
		private int value;
		public TitleInfo(String status, int value){
			this.status = status;
			this.value = value;
		}
		public String getStatus(){
			return this.status;
		}
		public int getValue(){
			return this.value;
		}
	}
	@RequestMapping("/")
	public String reports(Model model) {
		
		String date1 = "2017-01-01 00:00:01";
		String date2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetail = (CustomUserDetails) authentication.getPrincipal();
		
		UserEntity user = userRepository.findByFirstname(userDetail.getFirstname());
		if (user != null){
			
		
		model.addAttribute("username",user.getName());
		model.addAttribute("firstname",user.getFirstname());
		model.addAttribute("city",user.getCities().getName());
		
		if (userDetail.getRole().equals("ADMIN")){
			
			return "index";
		}
		if (userDetail.getRole().equals("MANAGER")){
			
			List<TitleInfo> titleInfos = new ArrayList<TitleInfo>();
			
			List<Status> status = statusRepository.findAll();
			for(Status s: status){
				List<InvitationEntity> ient = invitationRepository.findByCityAndStatusAndDate1Between( user.getCities(), s, date1, date2);
				titleInfos.add( new TitleInfo(s.getName() + ": ",ient.size()));
			}
			model.addAttribute("statusinfo", titleInfos);
			return "manager";
		}
		if (userDetail.getRole().equals("DOC")){
			
	List<TitleInfo> titleInfos = new ArrayList<TitleInfo>();
			
			List<Status> status = statusRepository.findAll();
			for(Status s: status){
				List<InvitationEntity> ient = invitationRepository.findByDoctorAndStatusAndDate1Between(user, s,  date1, date2);
			
				titleInfos.add( new TitleInfo(s.getName() + ": ",ient.size()));
			}
			model.addAttribute("statusinfo", titleInfos);
			
			return "doctor";
		}
		}
		return "404";
		
	 }
	 @RequestMapping("/getAllStatus")
	 public @ResponseBody JSONData<List<Status>> getAllStatus(){
		 List<Status> status = statusRepository.findAll();
		 return new JSONData(status);
	 }
	 @RequestMapping("/saveStatus")
	 public @ResponseBody QueryResult saveStatus(@RequestBody Status status){
		
		 QueryResult result= null;
		 try{
			 statusRepository.save( status );
			 result = new QueryResult("SAVED");
		 }catch(DuplicateKeyException e){
			 result = new QueryResult("DuplicateKeyException");
		 }
		 return result;
	 }
	 @RequestMapping("/updateStatus")
	 public @ResponseBody QueryResult updateStatus(@RequestBody Status status){
		
		 QueryResult result= null;
		 try{
			 statusRepository.updateStatus(status.getId(), status.getName(), status.getColor());
			 result = new QueryResult("UPDATED");
		 }catch(Exception e){
			 result = new QueryResult("ERROR_UPDATED");
		 }
		 return result;
	 }
	 @RequestMapping("/dropStatus")
	 public @ResponseBody QueryResult dropStatus(@RequestBody Status status){
		 QueryResult result= null;
		 Status droped = statusRepository.findByName(status.getName());
		 if (droped != null){
			 try{
				 statusRepository.delete(droped);
				 result = new QueryResult("DROPED");
			 }catch(Exception e){
				 result = new QueryResult("Exception");
			 }
		 }
		 else{
			 result = new QueryResult("Exception");
		 }
		 return result;
	 }

	 @SuppressWarnings("unchecked")
	 @RequestMapping("/getDocInvitByUser")
	 public @ResponseBody JSONData<List<InvitationEntity>> getDocInvitByUser(@RequestParam("name") String name,
			 @RequestParam("date1") String date1, @RequestParam("date2") String date2 , @RequestParam("inv") String inv)
	 {

		 List<InvitationEntity> invitations = null ;
		 UserEntity user  = userRepository.findByFirstname(name);
		 Status status = statusRepository.findByName(inv);
		 if (user!=null){
				if (inv.equals("NULL")){
					invitations =  invitationRepository.findByDoctorAndDate1Between(user, date1, date2);
				}else{
					Investigation in = investigationRepository.findByName( inv );
					invitations =  invitationRepository.findByDoctorAndStatusAndDate1Between(user, status, date1, date2);
				}
		 }
		
		 return new JSONData(invitations);
	 }
	 
	 
	 @SuppressWarnings("unchecked")
	 @RequestMapping("/getDocInvitByCity")
	 public @ResponseBody JSONData<List<InvitationEntity>> getDocInvitByCity(@RequestParam("name") String name,
			 @RequestParam("date1") String date1, @RequestParam("date2") String date2 , @RequestParam("inv") String inv)
	 {
		 List<InvitationEntity> invitations = null ;
		 UserEntity user  = userRepository.findByFirstname(name);

		 if (user!=null){
				if (inv.equals("NULL")){
					invitations =  invitationRepository.findByCityAndDate1Between(user.getCities(), date1, date2);
				}else{
					Status status = statusRepository.findByName(inv);
					invitations =  invitationRepository.findByCityAndStatusAndDate1Between(user.getCities(), status, date1, date2);
				}
		 }
		
		 return new JSONData(invitations);
	 }
	 
	 @RequestMapping("/updateManagerInvitation")
	 public @ResponseBody QueryResult updateManagerInvitation(@RequestBody InvitParams p){
		 Status status = statusRepository.findByName(p.getStatus());
		 UserEntity user = userRepository.findByFirstname(p.getManager());
		 QueryResult result= null;
		 try{
			 Long id = Long.parseLong(p.getId());
			 String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
			 invitationRepository.updateInvitation(id, p.getConclusion(), status, user.getName() + ", тел: " + user.getPhone(), timeStamp);
			 result = new QueryResult("UPDATED");
		 }catch(DuplicateKeyException e){
			 result = new QueryResult("ERROR_UPDATED");
		 }
		 return result;
	 }

	 
	 @RequestMapping("/saveDocInvit")
	 public @ResponseBody QueryResult saveDocInvit(@RequestBody InvitParams p){
		
		 List<Status> status = statusRepository.findAll();
		 
		 Long statusID = status.get(0).getId();
		 Status statusSave = statusRepository.findById(statusID);
		 
		 QueryResult result= null;
		 try{
			 UserEntity user = userRepository.findByFirstname(p.getCurrentuser());
			 Investigation invest = investigationRepository.findByName(p.getInvestigation());
			 
			 String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
			 InvitationEntity invit = new InvitationEntity();
			 invit.setFirstname(p.getFirstname());
			 invit.setSecondname(p.getSecondname());
			 invit.setSername(p.getSername());
			 invit.setPhone(p.getPhone());
			 invit.setComments(p.getComments());
			 invit.setDate1(timeStamp);
			 invit.setCity(user.getCities());
			 invit.setDoctor(user);
			 invit.setInvestigation(invest);
			 invit.setStatus(statusSave);
			 invitationRepository.save( invit );
			 
			 result = new QueryResult("SAVED");
		 }catch(DuplicateKeyException e){
			 result = new QueryResult("DuplicateKeyException");
		 }
		 return result;
	 }
	 @SuppressWarnings("unchecked")
	 @RequestMapping("/getAllCities")
	 public @ResponseBody JSONData<List<Cities>> getAllagents(){

		
		 List<Cities> cities = citiesRepository.findAll();
		 return new JSONData(cities);
	 }
	 @RequestMapping("/saveCity")
	 public @ResponseBody QueryResult saveCity(@RequestBody Cities city){
		
		 QueryResult result= null;
		 try{
			 citiesRepository.save(city);
			 result = new QueryResult("SAVED");
		 }catch(DuplicateKeyException e){
			 result = new QueryResult("DuplicateKeyException");
		 }
		 return result;
	 }
	 @RequestMapping("/dropCity")
	 public @ResponseBody QueryResult dropCity(@RequestBody Cities city){
		 QueryResult result= null;
		 Cities droped = citiesRepository.findByName(city.getName());
		 if (droped != null){
			 try{
				 citiesRepository.delete(droped);
				 result = new QueryResult("DROPED");
			 }catch(Exception e){
				 result = new QueryResult("Exception");
			 }
		 }
		 else{
			 result = new QueryResult("Exception");
		 }
		 return result;
	 }
	 @RequestMapping("/getAllInvestigation")
	 public @ResponseBody JSONData<List<Investigation>> getAllInvestigation(){

		 List<Investigation> inv = investigationRepository.findAll();
		 return new JSONData( inv );
	 }
	 @RequestMapping("/saveInvestigation")
	 public @ResponseBody QueryResult saveInvestigation(@RequestBody Investigation inv){
		
		 QueryResult result= null;
		 try{
			 investigationRepository.save( inv );
			 result = new QueryResult("SAVED");
		 }catch(DuplicateKeyException e){
			 result = new QueryResult("DuplicateKeyException");
		 }
		 return result;
	 }
	 @RequestMapping("/updateInvestigation")
	 public @ResponseBody QueryResult updateInvestigation(@RequestBody Investigation inv){
		
		 QueryResult result= null;
		 try{
			 investigationRepository.updateName(inv.getId(), inv.getName());
			 result = new QueryResult("UPDATED");
		 }catch(Exception e){
			 result = new QueryResult("ERROR_UPDATE");
		 }
		 return result;
	 }
	 @RequestMapping("/dropInvestigation")
	 public @ResponseBody QueryResult dropInvestigation(@RequestBody Investigation inv){
		 QueryResult result= null;
		 Investigation droped = investigationRepository.findByName(inv.getName());
		 if (droped != null){
			 try{
				 investigationRepository.delete(droped);
				 result = new QueryResult("DROPED");
			 }catch(Exception e){
				 result = new QueryResult("Exception");
			 }
		 }
		 else{
			 result = new QueryResult("Exception");
		 }
		 return result;
	 }
	 
	 @SuppressWarnings("unchecked")
	 @RequestMapping("/getAllUsers")
	 public @ResponseBody JSONData<List<UserEntity>> getAllUsers(){

		
		 List<UserEntity> users = userRepository.findAll();
		 return new JSONData( users );
	 }
	
	 @SuppressWarnings("unchecked")
	 @RequestMapping("/getUsersByCityAndRole")
	 public @ResponseBody JSONData<List<UserEntity>> getUsersByCityAndRole( @RequestParam("cityName") String cityName ){

		 Cities city = citiesRepository.findByName( cityName );
		 
		 List<UserEntity> users = userRepository.findByCityAndRole( city, "DOC" );
		 
		 return new JSONData( users );
	 }
	 @RequestMapping("/saveUser")
	 public @ResponseBody QueryResult saveUser(@RequestBody UserParams userParams){
		
		 QueryResult result= null;
		 Cities city = citiesRepository.findByName( userParams.getCity() );
		 if (city != null){
			 try{
				 UserEntity user = new UserEntity();
				 user.setEmail( userParams.getEmail() );
				 user.setFirstname( userParams.getFirstname() );
				 user.setName( userParams.getHumanname() );
				 user.setPassword( userParams.getPassword() );
				 user.setPhone(userParams.getPhone());
				 user.setRole( userParams.getRole() );
				 user.setCity(city);
				 user.setWorkplace(userParams.getWorkplace());
				 userRepository.save( user );
				 result = new QueryResult("SAVED");
			 }catch(Exception e){
				 result = new QueryResult("DuplicateKeyException");
			 } 
		 }else{
			 result = new QueryResult("ERROR");
		 }
		 return result;
	 }
	 @RequestMapping("/createReport")
	 public @ResponseBody JSONData<Doctors> createReport(@RequestBody ReportQuery reportQuery){
		 String methodName = "findByDoctorStatusInvestigation";
		
		 if (reportQuery.getDoctor().equals("selectAll")){
			 methodName = methodName.replace("Doctor", "");
		 }
		 if (reportQuery.getInvestigation().equals("selectAll")){
			 methodName = methodName.replace("Investigation", "");
		 }
		 if (reportQuery.getStatus().equals("selectAll")){
			 methodName = methodName.replace("Status", "");
		 }
		 List<Doctors> report = createDoctorsReport(methodName, reportQuery ); 
		 return new JSONData( report );
	 }
	 private List<Doctors> createDoctorsReport(String methodName, ReportQuery reportQuery){
	
		 ServiceInvitationRepo service = new ServiceInvitationRepo(invitationRepository, citiesRepository, userRepository, statusRepository, investigationRepository);
		 List<Doctors> reports = null;
		 Method[] methods  = service.getClass().getDeclaredMethods();
		 Map<String, Method> map = new HashMap<String, Method>();
		 for(Method m: methods ){
		    	map.put(m.getName(),m);
		  }
		 Method activeMethod = map.get(methodName);
		
		 try {
			 reports = (List<Doctors>) activeMethod.invoke(service, reportQuery);
		 
		 } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			
			e.printStackTrace();
		}
		return reports;	 
	 }
	 @RequestMapping("/updateUser")
	 public @ResponseBody QueryResult updateUser(@RequestBody UserEntity user){
		 QueryResult result= null;
		
		 UserEntity updated = userRepository.findByFirstname(user.getFirstname());
		 if (updated != null){
			 try{
				 userRepository.updateUser(user.getName(), user.getFirstname(), user.getPassword(), user.getPhone(), user.getEmail(), user.getWorkplace());
		
				 result = new QueryResult("UPDATED");
				
			 }catch(Exception e){
				 result = new QueryResult("ERROR_UPDATE");
			 }
		 }
		 else{
			 result = new QueryResult("ERROR_UPDATE");
		 }
		 return result;
	 }

	
}	
	
