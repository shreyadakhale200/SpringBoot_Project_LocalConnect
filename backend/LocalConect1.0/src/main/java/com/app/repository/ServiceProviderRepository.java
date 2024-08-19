package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.ServiceProvider;
import com.app.entities.UserDetail;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

	Optional<ServiceProvider> findFirstByService(String service);

}
