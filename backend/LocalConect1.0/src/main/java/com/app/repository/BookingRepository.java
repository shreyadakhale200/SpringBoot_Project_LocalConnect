package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Booking;
import com.app.entities.ServiceProvider;

public interface BookingRepository extends JpaRepository<Booking, Long>{

	//List<Booking> findAllById(Long id);
    
	List<Booking> findAllByServiceProvider(Long serviceProvider);

	List<Booking> findAllByServiceProvider(ServiceProvider serviceProviderr);

	Optional<Booking> findByPrice(double amount);

}
