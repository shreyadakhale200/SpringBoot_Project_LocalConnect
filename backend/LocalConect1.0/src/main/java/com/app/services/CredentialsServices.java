package com.app.services;

import com.app.DTO.CredentialDTO;
import com.app.DTO.LoginDTO;
import com.app.DTO.UpdateDTO;
import com.app.entities.Login;

public interface CredentialsServices {
//	public String changePassword(String password);
	 public boolean updatePassword(UpdateDTO newuser) ;
		public CredentialDTO login(LoginDTO logindto) ;


}
