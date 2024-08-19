package com.app.services;

import com.app.DTO.BookingDTO;
import com.app.DTO.*;
import com.app.DTO.ConfirmBookingDTO;
import com.app.entities.Booking;
import com.app.entities.Payment;
import com.app.entities.ServiceProvider;
import com.app.entities.Status;
import com.app.entities.UserDetail;

import com.app.repository.BookingRepository;
import com.app.repository.PaymentRepository;
import com.app.repository.ServiceProviderRepository;
import com.app.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Clock;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

//    @Value("${file.booking.upload.location}")
//    private String baseFolder;

    @Autowired
    private JavaMailSender sender;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private UserRepository userDetailRepository;
    @Autowired
    private ServiceProviderRepository serviceProviderRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    @Override
  
    public BookingDTO createBooking(BookingDTO bookingDTO) throws Exception {
        // Fetch user
        UserDetail user = userDetailRepository.findById(bookingDTO.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch service provider
        ServiceProvider serviceProvider = serviceProviderRepository.findFirstByService(bookingDTO.getService().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Service provider not found"));

        // Create and save the booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setServiceProvider(serviceProvider);
        booking.setServiceName(bookingDTO.getService());
        booking.setDate(bookingDTO.getDate());
        booking.setTime(bookingDTO.getTime());
        booking.setBookingStatus(Status.PENDING); // Initial status
        booking.setPaymentStatus(Status.PENDING); // Initial payment status
        booking.setPrice(500.00); // Set the price
        booking.setDuration(2);

        Booking savedBooking = bookingRepository.save(booking);

        // Optional: Send a booking confirmation email (if needed)
        // sendBookingConfirmationEmail(user, serviceProvider, savedBooking);

      
        return bookingDTO;
    }


 
       // sendBookingConfirmationEmail(user, serviceProvider, persistentBooking);
        
       // return bookingDTO ;
  //  }







	@Override
	public List<BookingDTO> getAllBookings() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public BookingDTO getBookingById(Long bookingId) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public void deleteBooking(Long bookingId) throws Exception {
		// TODO Auto-generated method stub
		
	}



	@Override
	public void sendConfirm(ConfirmBookingDTO bk) {
	    // Validate ConfirmBookingDTO
	    ValidationUtil.validateBookingDTO(bk);

	    System.out.println("Booking ID: " + bk.getBooking().getId());

	    // Fetch the booking record by ID
	    Optional<Booking> optionalBooking = bookingRepository.findById(bk.getBooking().getId());
	    
	    // Validate booking existence
	    ValidationUtil.validateBooking(optionalBooking);

	    Booking booking = optionalBooking.get();
	    System.out.println("Booking " + booking.toString());
	    System.out.println("Booking service provider ID: " + bk.getUserid());

	    // Fetch and validate the ServiceProvider associated with the booking
	    Optional<ServiceProvider> optionalServiceProvider = serviceProviderRepository.findById(bk.getUserid());
	    ValidationUtil.validateServiceProvider(optionalServiceProvider, bk.getUserid());
	    ServiceProvider serviceProvider = optionalServiceProvider.get();

	    // Fetch and validate the UserDetail associated with the booking
	    Optional<UserDetail> optionalUser = userDetailRepository.findById(booking.getUser().getUserDetailId());
	    ValidationUtil.validateUser(optionalUser, booking.getUser().getUserDetailId());
	    UserDetail user = optionalUser.get();

	    // Update the service provider status in the booking
	    booking.setBookingStatus(Status.DONE);
	    booking.setServiceProvider(serviceProvider);

	    // Save the updated booking record
	    bookingRepository.save(booking);

	    // Send confirmation emails to both the user and service provider
	    sendBookingConfirmationEmail(user, serviceProvider, booking);
	}
	private void sendBookingConfirmationEmail(UserDetail user, ServiceProvider serviceProvider, Booking booking) {
	    SimpleMailMessage messageToUser = new SimpleMailMessage();
	    messageToUser.setTo(user.getEmail());
	    messageToUser.setSubject("Booking Confirmation");
	    messageToUser.setText("Dear " + user.getName() + ",\nYour booking with " + serviceProvider.getName() + " has been confirmed.\nBooking ID: " + booking.getBookingId()+"\n"
	    		+ "http://localhost:3000/payment");
	    sender.send(messageToUser);

	    SimpleMailMessage messageToServiceProvider = new SimpleMailMessage();
	    messageToServiceProvider.setTo(serviceProvider.getEmail());
	    messageToServiceProvider.setSubject("New Booking Received");
	    messageToServiceProvider.setText("Dear " + serviceProvider.getName() + ",\nYou have a new booking from " + user.getName() + ".\nBooking ID: " + booking.getBookingId());
	    sender.send(messageToServiceProvider);
	}




}
