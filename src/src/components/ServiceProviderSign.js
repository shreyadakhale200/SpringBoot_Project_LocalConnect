// ServiceProviderSignup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import shared styles for signup pages

const ServiceProviderSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [service, setService] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [adhaar, setAdhaar] = useState('');
  const [profilePicture, setProfilePicture] = useState('http://happymeal');
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

  const validatePincode = (pincode) => {
    const pinCodeRegex = /^[0-9]{5,6}$/;
    return pinCodeRegex.test(pincode);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0-9]{10}$/; // Assuming 10 digit phone number
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleLogin = () => {
    // Navigate to the login page
    navigate('/service-provider-login');
  };

  const handleSignupSubmit = async () => {
    setError('');

    // Check if all fields are filled
    if (
      !email || !password || !confirmPassword || !name || !gender ||
      !address || !pincode || !service || !phoneNumber || !adhaar 
    ) {
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

    // Validate PIN code
    if (!validatePincode(pincode)) {
      setError('Please enter a valid 5 or 6-digit PIN code.');
      return;
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/helper/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          gender,
          address,
          pincode,
          service,
          phoneNumber,
          adhaar,
          profilePicture
        }),
      });

      if (response.ok) {
        navigate('/service-provider-dashboard'); // Redirect on successful completion
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to register. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Service Provider Signup</h2>
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
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
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
        placeholder="Aadhaar Number"
        value={adhaar}
        onChange={(e) => setAdhaar(e.target.value)}
      />
    
      <select
        className="signup-input"
        value={service}
        onChange={(e) => setService(e.target.value)}
      >
        <option value="">Select Service</option>
        <option value="8">Plumbing</option>
        <option value="1">Electrician</option>
        <option value="2">Home Cleaning</option>
        <option value="3">Carpentry</option>
        <option value="4">Ac Repair </option>
        <option value="5">Washing Machien Repair</option>
        <option value="6">Barber</option>
        <option value="7">Car and Bike washing</option>

      </select>
      <button className="signup-button" onClick={handleSignupSubmit}>
        Sign Up
      </button>
      <button className="signup-button" onClick={handleLogin}>
        Login
      </button>

      {error && <p className="signup-error">{error}</p>}
    </div>
  );
};

export default ServiceProviderSignup;
