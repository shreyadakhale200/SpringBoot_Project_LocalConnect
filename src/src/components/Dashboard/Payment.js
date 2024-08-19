import React, { useState } from 'react';
import './Payment.css';

const payments = [
  { payment_id: 1, amount: 100, booking_id: 101 },
  { payment_id: 2, amount: 150, booking_id: 102 },
  { payment_id: 3, amount: 200, booking_id: 103 },
  // Add more payment records as needed
];

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
    setShowForm(true);
  };

  const handleMakePayment = () => {
    // Simulate sending email or making payment
    alert('Thank you for using our service, your payment details will be sent to your registered email.');
    
    // Reset the form and close it after payment
    setShowForm(false);
    setSelectedPayment(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedPayment(null);
  };

  return (
    <div>
      <div className="payment-list-container">
        {payments.map((payment) => (
          <div key={payment.payment_id} className="payment-card" onClick={() => handlePaymentClick(payment)}>
            <div className="payment-card-text">
              <p><strong>Payment ID:</strong> {payment.payment_id}</p>
              <p><strong>Amount:</strong> {payment.amount}</p>
              <p><strong>Booking ID:</strong> {payment.booking_id}</p>
            </div>
          </div>
        ))}
      </div>

      {showForm && selectedPayment && (
        <>
          <div className="overlay"></div>
          <div className="details-container">
            <h3>Payment Details</h3>
            <form>
              <p><strong>Payment ID:</strong> {selectedPayment.payment_id}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
              <p><strong>Booking ID:</strong> {selectedPayment.booking_id}</p>
            
              <div className="form-buttons">
                <button type="button" onClick={handleMakePayment}>Make Payment</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;