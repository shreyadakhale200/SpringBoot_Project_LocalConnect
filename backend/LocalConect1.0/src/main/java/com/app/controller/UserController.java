package com.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.UserDetailDTO;
import com.app.entities.UserDetail;
import com.app.services.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/user")
public class UserController {
	
	@Autowired
	private UserService userser;
	
	@PostMapping
	public String createUser(@RequestBody UserDetailDTO ud) {
		
		return userser.addUserDetail(ud);
		
	}
	@GetMapping
	public List<UserDetail> getDetail(){
		return userser.getAllDetail();
	}

	@GetMapping("/delete/{id}")
	public void delete(@PathVariable Long id)
	{
		userser.Delete(id);
	}
		@PostMapping("/forgotpass")
		public ResponseEntity<String> updatePass(@RequestBody Map<String, String> emailRequest) {
		    String email = emailRequest.get("email");  // Extract email from JSON
		    System.out.println(email);
		    userser.sendmail(email);
	        return ResponseEntity.ok("done" );

		}
	
	@PostMapping("/update")
	public void update(@RequestBody UserDetail uds)
	{
		userser.Update(uds);
	}
}
