package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserDetail;

public interface UserRepository extends JpaRepository<UserDetail, Long> {

}
