package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Login;

public interface CredentialsRepository extends JpaRepository<Login, Long> {

	Optional<Login> findByEmailAndPassword(String email, String password);

	Optional<Login> findByEmail(String email);

}
