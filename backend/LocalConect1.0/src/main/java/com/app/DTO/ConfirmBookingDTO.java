package com.app.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmBookingDTO {
	private Long userid;
	private ServiceProviderRequestDTO Booking;
	@Override
	public String toString() {
		return "ConfirmBookingDTO [SerProId=" + userid + ", Booking=" + Booking.toString() + "]";
	}
	
	
}
