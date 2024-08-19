package com.app.services;

import java.util.List;

import com.app.DTO.UserDetailDTO;
import com.app.entities.UserDetail;

public interface UserService {
	public String addUserDetail(UserDetailDTO ud);
	public List<UserDetail> getAllDetail();
	public void Update(UserDetail uds);
	public void Delete(Long id);
	public void sendmail(String email);

}
