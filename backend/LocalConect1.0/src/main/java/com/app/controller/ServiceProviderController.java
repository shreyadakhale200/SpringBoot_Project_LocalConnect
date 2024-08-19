package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.ServiceProviderDTO;
import com.app.DTO.ServiceProviderRequestDTO;
import com.app.DTO.UserDetailDTO;
import com.app.entities.ServiceProvider;
import com.app.services.ServiceproviderService;
import com.app.services.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/helper")
public class ServiceProviderController {
	
	//For dependency injection
	@Autowired
	private ServiceproviderService spser;
	
	// to insert the data into service provider details as well as login
	@PostMapping("/insert")
	public String createServiceProvider(@RequestBody ServiceProviderDTO ud) {
	    System.out.println("Password from DTO in controller: " + ud.getPassword());
	    return spser.addDetail(ud);
	}

	
	// to get all the data from the serviceprovider table
	@GetMapping("/get")
	public List<ServiceProvider> getServiceProvider() {
		return spser.showDerails();
		
	}
	
	@GetMapping("/myrequest/{userId}")
	public List<ServiceProviderRequestDTO> getServiceProviderbyId(@PathVariable Long userId) {
		System.out.println(userId);
		return spser.showMyRequest(userId);
		
	} 
	// to update the data 
//	@PostMapping("/update")
//	public void Update(@RequestBody ConfirmBookingDTO sp)
//	{
//		spser.Update(sp);
//	}
	
	// deleting our service provider by id 
	@GetMapping("/delete/{id}")
	public void Delete(@PathVariable Long id)
	{
		spser.Delete(id);
	}
	
	//getting the request
	
	

}
