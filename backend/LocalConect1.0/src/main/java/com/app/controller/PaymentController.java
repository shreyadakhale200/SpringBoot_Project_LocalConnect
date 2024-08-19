package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.PaymentDTO;
import com.app.entities.UserDetail;
import com.app.services.PaymentService;

@RestController
@RequestMapping("api/v1/payments")
public class PaymentController {

	 @Autowired
	    private PaymentService paymentService;

	    @PostMapping("/processpayment/{id}")
	    public ResponseEntity<String> createBooking(@PathVariable Long id,@RequestBody PaymentDTO paymentDTO) {
	        try {
	            paymentService.newPayment(id,paymentDTO);
	            
	            if(ResponseEntity.status(null)==ResponseEntity.status(HttpStatus.CREATED)){
	            	paymentService.sendConfirm(paymentDTO.getPaymentId());
	            }
	            return ResponseEntity.ok("Transaction id: "+paymentDTO.getPaymentId());
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	    
	    @GetMapping
	    public List<PaymentDTO> listAllPayment() {
	        
	    		return paymentService.showPayments();
	    }
}