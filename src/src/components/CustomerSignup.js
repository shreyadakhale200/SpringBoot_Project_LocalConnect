import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import shared styles for signup pages

const CostomerSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Assuming Phone number is a 10 digit number
    const phoneNumberRegex = /^[0-9]{10,}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const validatePinCode = (pinCode) => {
    // Assuming PIN code is a 5 or 6 digit number
    const pinCodeRegex = /^[0-9]{5,6}$/;
    return pinCodeRegex.test(pinCode);
  };

  const handleSignupSubmit = async () => {
    setError('');

    // Check if all fields are filled
    if (!email || !password || !confirmPassword || !phoneNumber || !name || !gender || !address || !pinCode) {
      setError('All fields are required.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain a number and a special character.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Validate Phone Number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit Phone Number.');
      return;
    }

    // Validate PIN code
    if (!validatePinCode(pinCode)) {
      setError('Please enter a valid 5 or 6-digit PIN code.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, phoneNumber, name, gender, address, pinCode }),
      });

      if (response.ok) {
        navigate('/customer-login'); // Redirect on successful completion
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleLogin = () => {
    navigate('/customer-login');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <input
        className="signup-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="signup-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="signup-input"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        className="signup-input"
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        className="signup-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="signup-input"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        className="signup-input"
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="signup-input"
        type="text"
        placeholder="PIN Code"
        value={pinCode}
        onChange={(e) => setPinCode(e.target.value)}
      />
      <button className="signup-button" to='/customer-login' onClick={handleSignupSubmit} >
        Sign Up
      </button>
      <button className="signup-button" to='/customer-login' onClick={handleLogin}>
        Login
      </button>
      {error && <p className="signup-error">{error}</p>}
    </div>
  );
};

export default CostomerSignup;
