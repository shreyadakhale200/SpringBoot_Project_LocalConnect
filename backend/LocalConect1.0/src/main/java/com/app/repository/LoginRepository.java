package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Login;
import com.app.entities.ServiceProvider;
import com.app.entities.UserDetail;

public interface LoginRepository extends JpaRepository<Login, Long> {
	@Query("SELECT u FROM UserDetail u WHERE u.login.id = :id")
	UserDetail findmebyLogin(Long id);
	
	@Query("SELECT u FROM ServiceProvider u WHERE u.login.id = :id")
	ServiceProvider findmebyservice(Long id);



}
