package com.app.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Email;

import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "service_provider_detail")
@Getter
@Setter
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long providerDetailId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String service;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "login_id", nullable = false)
    private Login login;

    @Column(nullable = false)
    private String address;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String pincode;

    @Column(nullable = false)
    private String adhaar;
    
    @Column(length = 35, unique = true)
   	private String email;

    // Other fields and methods
}
