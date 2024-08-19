package com.app.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceProviderRequestDTO {
    private Long Id;
  //  private Long BookingId;
 //   private String service;
    private String date; // You can also use LocalDate if you want a date object
    private String time; // You can also use LocalTime or LocalDateTime for time objects
    private int duration;
    private String Address;
    private String username;
    private int pincode;

    // Constructors
    public ServiceProviderRequestDTO() {
    }

    
	@Override
	public String toString() {
		return "ServiceProviderRequestDTO [Id=" + Id + ", date=" + date + ", time=" + time + ", duration=" + duration
				+ ", Address=" + Address + ", Username=" + username + ", pincode=" + pincode + "]";
	}


	public ServiceProviderRequestDTO(Long id, String date, String time, int duration, String address, String username,
			int pincode) {
		super();
		Id = id;
		this.date = date;
		this.time = time;
		this.duration = duration;
		Address = address;
		username = username;
		this.pincode = pincode;
	}
	

 

    
}
