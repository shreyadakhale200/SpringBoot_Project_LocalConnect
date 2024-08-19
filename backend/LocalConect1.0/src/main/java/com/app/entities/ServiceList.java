package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "servicelist")
@Getter
@Setter
public class ServiceList {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "services_id")
	private Long id;
	
    @Column(name = "service_name", length = 50)
	private String servicename;
    
    @Column(name="price",length=50)
    private int price;

}
