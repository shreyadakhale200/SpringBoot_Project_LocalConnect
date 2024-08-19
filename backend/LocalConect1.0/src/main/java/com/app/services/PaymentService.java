package com.app.services;


import java.util.List;

import com.app.DTO.PaymentDTO;

public interface PaymentService {

	public String newPayment(Long id,PaymentDTO paymentDTO);
	public List<PaymentDTO> showPayments();
	public List<PaymentDTO> showMyPayment(Long id);
	void sendConfirm(Long paymentId);
}