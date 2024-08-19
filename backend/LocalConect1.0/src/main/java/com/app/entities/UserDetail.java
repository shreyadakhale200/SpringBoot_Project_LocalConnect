package com.app.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_detail_id")
    private Long userDetailId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

//    @Column(name = "last_name", nullable = false, length = 50)
//    private String lastName;

    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "login_id", nullable = false)
    private Login login;

    @Column(name = "address", length = 255) // Adjust length as needed
    private String address;

    @Column(name = "gender")
    private String gender;
    
    @Column(length = 35, unique = true)
   	private String email;
    
    @Column(nullable = false)
    private int pinCode;


}
