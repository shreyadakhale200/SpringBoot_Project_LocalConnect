package com.app.DTO;

import java.util.Optional;

import com.app.entities.Booking;
import com.app.entities.ServiceProvider;
import com.app.entities.UserDetail;

public class ValidationUtil {
    
    public static void validateBooking(Optional<Booking> optionalBooking) {
        if (optionalBooking.isEmpty()) {
            throw new RuntimeException("Booking not found with the provided ID.");
        }
    }
    
    public static void validateServiceProvider(Optional<ServiceProvider> optionalServiceProvider, Long serviceProviderId) {
        if (optionalServiceProvider.isEmpty()) {
            throw new RuntimeException("ServiceProvider not found with ID: " + serviceProviderId);
        }
    }
    
    public static void validateUser(Optional<UserDetail> optionalUser, Long userId) {
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
    }
    
    public static void validateBookingDTO(ConfirmBookingDTO bk) {
        if (bk == null || bk.getBooking() == null || bk.getBooking().getId() == null) {
            throw new IllegalArgumentException("Invalid ConfirmBookingDTO or missing booking ID.");
        }
        if (bk.getUserid() == null) {
            throw new IllegalArgumentException("User ID is required.");
        }
    }
}
