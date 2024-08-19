package com.app.controller;


import com.app.DTO.BookingDTO;
import com.app.DTO.ConfirmBookingDTO;
import com.app.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")

@RestController
@RequestMapping("api/v1/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        try {
            BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
            return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
     
    @PostMapping("/confirm")
    public void confirmbooking(@RequestBody ConfirmBookingDTO id) {
    	System.out.println(id.toString());
    	bookingService.sendConfirm(id);
    }

//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<BookingDTO>> getAllBookingsForUser(@PathVariable Long userId) {
//        try {
//            List<BookingDTO> bookings = bookingService.getAllBookingsForUser(userId);
//            return new ResponseEntity<>(bookings, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/provider/{serviceProviderId}")
//    public ResponseEntity<List<BookingDTO>> getAllBookingsForServiceProvider(@PathVariable Long serviceProviderId) {
//        try {
//            List<BookingDTO> bookings = bookingService.getAllBookingsForServiceProvider(serviceProviderId);
//            return new ResponseEntity<>(bookings, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @DeleteMapping("/{bookingId}/user/{userId}")
//    public ResponseEntity<String> cancelBooking(@PathVariable Long bookingId, @PathVariable Long userId) {
//        try {
//            bookingService.cancelBooking(bookingId, userId);
//            return new ResponseEntity<>("Booking canceled successfully", HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
