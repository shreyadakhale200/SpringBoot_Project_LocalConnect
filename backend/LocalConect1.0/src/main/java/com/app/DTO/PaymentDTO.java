package com.app.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaymentDTO {

    private Long paymentId;
    private Long bookingId;
    private double amount;
  //  private String razorpayPaymentId;
    private String status;

    // Constructors
//    public PaymentDTO() {}

//    public PaymentDTO(Long paymentId, String orderId, Double amount, String razorpayPaymentId, String status) {
//        this.paymentId = paymentId;
//        this.orderId = orderId;
//        this.amount = amount;
//  //      this.razorpayPaymentId = razorpayPaymentId;
//        this.status = status;
//    }
//
//    // Getters and Setters
//    public Long getPaymentId() {
//        return paymentId;
//    }
//
//    public void setPaymentId(Long paymentId) {
//        this.paymentId = paymentId;
//    }
//
//    public String getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(String orderId) {
//        this.orderId = orderId;
//    }
//
//    public Double getAmount() {
//        return amount;
//    }
//
//    public void setAmount(Double amount) {
//        this.amount = amount;
//    }
//
//    public String getRazorpayPaymentId() {
//        return razorpayPaymentId;
//    }
//
//    public void setRazorpayPaymentId(String razorpayPaymentId) {
//        this.razorpayPaymentId = razorpayPaymentId;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
}