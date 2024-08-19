package com.app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.app.DTO.PaymentDTO;
import com.app.entities.Booking;
import com.app.entities.Payment;
import com.app.entities.ServiceProvider;
import com.app.entities.Status;
import com.app.entities.UserDetail;
import com.app.repository.BookingRepository;
import com.app.repository.PaymentRepository;
import com.app.repository.ServiceProviderRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService{

	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
    private BookingRepository bookingrepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
    private UserRepository userDetailRepository;
	@Autowired
	private ServiceProviderRepository serviceProviderRepository;	   
	@Autowired
    private JavaMailSender sender;
	
	@Override
	public String newPayment(Long id,PaymentDTO paymentDTO) {
		//Fetch Booking
		Booking booking = bookingrepository.findById(paymentDTO.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
		Booking amount = bookingrepository.findByPrice(paymentDTO.getAmount())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
		// Make and save the Payment
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentId(paymentDTO.getPaymentId());
        payment.setAmount(amount);
        payment.setStatus(Status.DONE);

		/* Payment newPayment = */paymentRepository.save(payment);

        // Optional: Send a booking confirmation email (if needed)
        // sendBookingConfirmationEmail(user, serviceProvider, savedBooking);
//        payment.setStatus("SUCCESSFUL");
      
        return "Payment Successfull"+paymentDTO.getStatus();
	}
	@Override
	public List<PaymentDTO> showPayments() {
		return paymentRepository.findAll() //List<Payment>
				.stream() //Stream<Service>
				.map(payment -> 
				modelMapper.map(payment,PaymentDTO.class)) 
				.collect(Collectors.toList());
	}
	@Override
	public List<PaymentDTO> showMyPayment(Long id) {
		// TODO Auto-generated method stub
		List<PaymentDTO> l=(List<PaymentDTO>) paymentRepository.findById(id).orElseThrow();
		return l;
	}
	@Override
	public void sendConfirm(Long paymentId) {
		Optional<Payment> optionalPayment = paymentRepository.findById(paymentId);

	    if (optionalPayment.isPresent()) {
	        Payment payment = optionalPayment.get();

	        // Fetch the Booking associated with the Payment
	        Booking booking = bookingrepository.findById(payment.getBooking().getBookingId())
	                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + payment.getBooking().getBookingId()));

	        // Fetch the UserDetail associated with the booking
	        UserDetail user = userDetailRepository.findById(booking.getUser().getUserDetailId())
	                .orElseThrow(() -> new RuntimeException("User not found with ID: " + booking.getUser().getUserDetailId()));

	        // Fetch the ServiceProvider associated with the booking
	        ServiceProvider serviceProvider = serviceProviderRepository.findById(booking.getServiceProvider().getProviderDetailId())
	                .orElseThrow(() -> new RuntimeException("ServiceProvider not found with ID: " + booking.getServiceProvider().getProviderDetailId()));

	        //Fetch the Booking Amount associated with the Payment
//	        Booking amount = bookingrepository.findByPrice(payment.getBooking().getPrice())
//	                .orElseThrow(() -> new RuntimeException("Amount not matching with booking amount "));

	        // Update the service provider status in the booking
	        payment.setStatus(Status.DONE);

	        // Save the updated booking record
	        paymentRepository.save(payment);

	        // Send confirmation email to both the user and service provider
	        sendBookingConfirmationEmail(user, payment, booking, serviceProvider);
	    } else {
	        // Handle the case where the booking is not found
	        throw new RuntimeException("Payment not found with ID: " + paymentId);
	    }
	} 
	
	private void sendBookingConfirmationEmail(UserDetail user, Payment payment, Booking booking, ServiceProvider serviceProvider) {
	    SimpleMailMessage messageToUser = new SimpleMailMessage();
	    messageToUser.setTo(user.getEmail());
	    messageToUser.setSubject("Payment Successfull!");
	    messageToUser.setText("Dear " + user.getName().toUpperCase() + ",\nYour payment Rs."+ payment.getAmount()+" having " + payment.getPaymentId()+ " was successful.\nBooking ID: " + booking.getBookingId());
	    sender.send(messageToUser);

	    SimpleMailMessage messageToServiceProvider = new SimpleMailMessage();
	    messageToServiceProvider.setTo(serviceProvider.getEmail());
	    messageToServiceProvider.setSubject("Payment Received!");
	    messageToServiceProvider.setText("Dear " + serviceProvider.getName().toUpperCase() + ",\nYou have received Rs. "+ payment.getAmount()+" from " + user.getName() + ".\nBooking ID: " + booking.getBookingId());
	    sender.send(messageToServiceProvider);
	}
}