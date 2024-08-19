package com.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.DTO.CredentialDTO;
import com.app.DTO.LoginDTO;
import com.app.DTO.UpdateDTO;
import com.app.entities.Login;
import com.app.entities.Purpose;
import com.app.entities.ServiceProvider;
import com.app.entities.UserDetail;
import com.app.repository.CredentialsRepository;
import com.app.repository.LoginRepository;
import com.app.repository.ServiceListRepository;

import javax.transaction.Transactional;

@Service
@Transactional
public class CredentialsServiceImpl implements CredentialsServices {

    @Autowired
    private CredentialsRepository credentialsRepository;

    @Autowired
    private ServiceListRepository servicerepo;

    @Autowired
    private LoginRepository loginrepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    // Update password with encryption
    public boolean updatePassword(UpdateDTO updateDTO) {
        // Retrieve the credential by email
        Login credential = credentialsRepository.findByEmail(updateDTO.getEmail()).orElse(null);
        
        if (credential != null) {
            // Encrypt the new password
            String encodedPassword = passwordEncoder.encode(updateDTO.getNewPassword());
            
            // Update the password in the credential
            credential.setPassword(encodedPassword);
            
            // Save the updated credential
            credentialsRepository.save(credential);
            return true;
        }
        
        return false; // Return false if the credential is not found
    }


    @Override
    public CredentialDTO login(LoginDTO logindto) {
        // Retrieve the user by email
        Login log = credentialsRepository.findByEmail(logindto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        // Check if the passwords match
        if (!passwordEncoder.matches(logindto.getPassword(), log.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Based on the purpose (either USER or SERVICE_PROVIDER), return the appropriate DTO
        if (log.getPurpose() == Purpose.USER) {
            UserDetail ud = loginrepo.findmebyLogin(log.getId());
            if (ud == null) {
                throw new NullPointerException("UserDetail not found for login ID: " + log.getId());
            }
            // Return User credentials
            return new CredentialDTO(ud.getUserDetailId(), ud.getName());
        } else if (log.getPurpose() == Purpose.SERVICE_PROVIDER) {
            ServiceProvider sp = loginrepo.findmebyservice(log.getId());
            if (sp == null) {
                throw new NullPointerException("ServiceProvider not found for login ID: " + log.getId());
            }
            // Return Service Provider credentials
            return new CredentialDTO(sp.getProviderDetailId(), sp.getName());
        } else {
            throw new IllegalArgumentException("Unknown purpose type");
        }
    }

	
}
