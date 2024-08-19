package com.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.DTO.UserDetailDTO;
import com.app.entities.Login;
import com.app.entities.Purpose;
import com.app.entities.UserDetail;
import com.app.repository.CredentialsRepository;
import com.app.repository.LoginRepository;
import com.app.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userrepo;
    

    @Autowired
    private JavaMailSender sender;


    @Autowired
    private CredentialsRepository loginrepo;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String addUserDetail(UserDetailDTO ud) {
        
        // Encrypt password
        String encryptedPassword = passwordEncoder.encode(ud.getPassword());
        
        Login login = new Login();
        login.setEmail(ud.getEmail());
        login.setPassword(encryptedPassword); // Set encrypted password
        login.setPurpose(Purpose.valueOf("USER"));
        
        Login savedLogin = loginrepo.save(login);
        
        // Create and save the UserDetail entity
        UserDetail userdetail = new UserDetail();
        userdetail.setName(ud.getName());
        userdetail.setGender(ud.getGender());
        userdetail.setPhoneNumber(ud.getPhoneNumber());
        userdetail.setAddress(ud.getAddress());
        userdetail.setEmail(ud.getEmail());
        userdetail.setPinCode(ud.getPinCode());
        userdetail.setLogin(savedLogin); // Associate login with UserDetail
        
        userrepo.save(userdetail);
        
        return "User details inserted successfully";
    }

    @Override
    public List<UserDetail> getAllDetail() {
        return userrepo.findAll();
    }

    @Override
    public void Update(UserDetail uds) {
        userrepo.save(uds);
    }

    @Override
    public void Delete(Long id) {
        userrepo.deleteById(id);
    }

    public void sendmail(String email) {
        // Validate the email address format
        email = email.trim();
        System.out.println(email);
        String emailPattern = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        if (!email.matches(emailPattern)) {
            throw new IllegalArgumentException("Invalid email address format");
        }

        SimpleMailMessage messageToUser = new SimpleMailMessage();
        messageToUser.setTo(email);
        messageToUser.setSubject("Password Reset");
        messageToUser.setText("Dear user, your password reset link is below: \n"
                             + "http://localhost:3000/update-password");
        
        sender.send(messageToUser);
    }
}
