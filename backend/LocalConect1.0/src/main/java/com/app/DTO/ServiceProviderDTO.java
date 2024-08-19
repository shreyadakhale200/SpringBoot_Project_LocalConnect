package com.app.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceProviderDTO {
    private Long providerDetailId;
    private String name;
    private String phoneNumber;
    private String service;  // Changed from Long serviceId to String service
    private String email;  // Added to hold email
    private String password;  // Added to hold password
    private String address;
    private String profilePicture;
    private String gender;
    private String pincode;  // Added to hold pincode
    private String adhaar;  // Added to hold adhaar number
}
