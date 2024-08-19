import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use navigate for redirection

  const handlePasswordReset = async () => {
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/forgotpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Password reset instructions have been sent to your email.');

        // Redirect to Update Password page after successful password reset
        navigate('/cutomer-login');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send password reset instructions.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <input
        className="forgot-password-input"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="forgot-password-button" onClick={handlePasswordReset}>
        Reset Password
      </button>
      {message && <p className="forgot-password-message">{message}</p>}
      {error && <p className="forgot-password-error">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
