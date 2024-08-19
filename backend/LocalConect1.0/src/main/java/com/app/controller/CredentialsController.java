package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.DTO.CredentialDTO;
import com.app.DTO.LoginDTO;
import com.app.DTO.UpdateDTO;
import com.app.entities.Login;
import com.app.services.CredentialsServices;
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/credentials")
public class CredentialsController {

    @Autowired
    private CredentialsServices credentialsService;

    // Endpoint to update password
    @PutMapping("/updatepassword")
    public ResponseEntity<String> updatePassword(@RequestParam UpdateDTO newPassword) {
        boolean isUpdated = credentialsService.updatePassword(newPassword);
        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<CredentialDTO> login(@RequestBody LoginDTO logindto) {
    
        return ResponseEntity.ok(credentialsService.login(logindto));
    }

    
    
}

