package com.app.services;

import java.util.List;

import com.app.DTO.ServiceProviderDTO;
import com.app.DTO.ServiceProviderRequestDTO;
import com.app.DTO.UserDetailDTO;
import com.app.entities.ServiceProvider;

public interface ServiceproviderService {
	public String addDetail(ServiceProviderDTO ud);
	public List<ServiceProvider> showDerails();
//	public void Update(ConfirmBookingDTO sp);
	public void Delete(Long id);
	public List<ServiceProviderRequestDTO> showMyRequest(Long id);
//	public void sendconfirm(Long bookingId);
 
}
