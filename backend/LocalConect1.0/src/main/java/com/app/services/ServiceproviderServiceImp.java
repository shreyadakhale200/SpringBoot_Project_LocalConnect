package com.app.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.DTO.ServiceProviderDTO;
import com.app.DTO.ServiceProviderRequestDTO;
import com.app.entities.Booking;
import com.app.entities.Login;
import com.app.entities.Purpose;
import com.app.entities.ServiceList;
import com.app.entities.ServiceProvider;
import com.app.entities.Status;
import com.app.entities.UserDetail;
import com.app.repository.BookingRepository;
import com.app.repository.CredentialsRepository;
import com.app.repository.LoginRepository;
import com.app.repository.ServiceListRepository;
import com.app.repository.ServiceProviderRepository;
import com.app.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ServiceproviderServiceImp implements ServiceproviderService {

    @Autowired
    private ServiceProviderRepository screpo;
    
    @Autowired
    private CredentialsRepository  loginrepo;
    
    @Autowired
    private ServiceListRepository servicerepo;
    
    @Autowired
    private BookingRepository bookingrepository;
    
    @Autowired
    private UserRepository userrepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Override
    public String addDetail(ServiceProviderDTO spDTO) {
        // Encrypt the password before saving
        String encodedPassword = passwordEncoder.encode(spDTO.getPassword());

        // Create and save the Login entity
        Login login = new Login();
        login.setEmail(spDTO.getEmail());
        login.setPassword(encodedPassword); // Save the encrypted password
        login.setPurpose(Purpose.valueOf("SERVICE_PROVIDER"));
        
        Login savedLogin = loginrepo.save(login);
        
        // No longer fetching Service object by ID, using the service name instead
        String serviceName = spDTO.getService(); // Get the service name from DTO
        
        // Create and save the ServiceProvider entity
        ServiceProvider serviceProvider = new ServiceProvider();
        serviceProvider.setName(spDTO.getName());
        serviceProvider.setPhoneNumber(spDTO.getPhoneNumber()); // Updated field name
        serviceProvider.setService(serviceName); // Set the service name as a string
        serviceProvider.setLogin(savedLogin); // Associate login with ServiceProvider
        serviceProvider.setAddress(spDTO.getAddress());
        serviceProvider.setProfilePicture(spDTO.getProfilePicture()); // Updated field name
        serviceProvider.setGender(spDTO.getGender());
        serviceProvider.setEmail(spDTO.getEmail());
        serviceProvider.setPincode(spDTO.getPincode()); // Added pincode
        serviceProvider.setAdhaar(spDTO.getAdhaar()); // Added adhaar
        
        // Save the ServiceProvider entity
        screpo.save(serviceProvider);
        
        return "Service provider details inserted successfully";
    }

    @Override
    public List<ServiceProvider> showDerails() {
        return screpo.findAll();
    }

    @Override
    public void Delete(Long id) {
        screpo.deleteById(id);
    }

    @Override
    public List<ServiceProviderRequestDTO> showMyRequest(Long serviceProvider) {
        ServiceProvider serviceProviderr = screpo.findById(serviceProvider)
                .orElseThrow();
        List<Booking> myBookings = bookingrepository.findAllByServiceProvider(serviceProviderr);
        List<ServiceProviderRequestDTO> requestDTOs = new ArrayList<>();

        for (Booking booking : myBookings) {
            if (booking.getBookingStatus() == Status.DONE) {
                continue;
            }

            Long userId = booking.getUser().getUserDetailId();
            UserDetail user = userrepository.findById(userId).orElse(null);

            if (user == null) {
                continue;
            }

            ServiceProviderRequestDTO dto = new ServiceProviderRequestDTO();
            dto.setDate(booking.getDate().toString());
            dto.setTime(booking.getTime().toString());
            dto.setDuration(booking.getDuration());
            dto.setAddress(user.getAddress());
            dto.setPincode(user.getPinCode());
            dto.setId(userId);
            dto.setUsername(user.getName());
            dto.setId(booking.getBookingId());

            requestDTOs.add(dto);
        }

        return requestDTOs;
    }
}
