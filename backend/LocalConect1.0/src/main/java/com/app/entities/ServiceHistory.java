package com.app.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "service_history")
@Getter
@Setter
public class ServiceHistory {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long historyId;

	    private Long userId;
	    private Long paymentId;
	    private Double price;
	    private String serviceProviderName;
	    private Long serviceProviderId;
	    private String userAddress;

	    // New field for date
	    private LocalDateTime date;
  
}
