package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.ServiceList;
import com.app.entities.ServiceProvider;
import com.app.entities.UserDetail;

public interface ServiceListRepository extends JpaRepository<ServiceList, Long>{
//	@Query("SELECT u FROM service_provider_detail u WHERE u.service_provider_id = :id")
//	ServiceProvider findmebyLogin(Long id);
//	ServiceProvider findmebyLogin(Long id);

}
