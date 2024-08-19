package com.app.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookingDTO {
//    private Long bookingId;
//    private Long userId;
//    private Long serviceProviderId;
//    private String serviceName;
//    private Double servicePrice;
//    private Integer serviceDuration;
//    private LocalDateTime bookingDate;
//    private String paymentStatus;
//    private String userStatus;
//    private String serviceProviderStatus;
//    private String bookingStatus;
	 private String service;
    private Long user_id;
    private LocalDate date; // Separate date field
    private LocalTime time;
    private int duration; 
    
}
