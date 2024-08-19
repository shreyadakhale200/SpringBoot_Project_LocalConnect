package com.app.services;

import com.app.DTO.BookingDTO;
import com.app.DTO.ConfirmBookingDTO;
import com.app.entities.Booking;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO) throws Exception;
   // String updateBooking(BookingDTO bookingDTO) throws Exception;
    List<BookingDTO> getAllBookings();
    BookingDTO getBookingById(Long bookingId) throws Exception;
    void deleteBooking(Long bookingId) throws Exception;
	void sendConfirm(ConfirmBookingDTO cnfrm);

}
