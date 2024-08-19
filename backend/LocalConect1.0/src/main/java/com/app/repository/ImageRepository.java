package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.ImagePath;
import com.app.entities.Login;

public interface ImageRepository extends JpaRepository<ImagePath, Long> {

}
