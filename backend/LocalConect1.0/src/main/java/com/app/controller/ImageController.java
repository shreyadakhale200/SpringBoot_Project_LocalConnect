package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.DTO.ImageDTO;
import com.app.services.ImageService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestBody ImageDTO imagePath) {
        imageService.saveImagePath(imagePath);
        return ResponseEntity.ok("Image path saved successfully: " + imagePath.getImagePath());
    }
}
