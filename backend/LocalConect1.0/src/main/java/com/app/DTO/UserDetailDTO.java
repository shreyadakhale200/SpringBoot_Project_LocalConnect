package com.app.DTO;

import javax.persistence.Column;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDetailDTO {
    private String name;
//    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;

    private String gender;
    private String password;
    private int pinCode;
    
  //  private LoginDTO login;
  


    // Getters and Setters
   

	
	
    
}
