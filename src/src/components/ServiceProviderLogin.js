import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setWithExpiry } from '../utils/localStorageHelper'; // Import the helper
import './Login.css';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/v1/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store user data in localStorage with a 1-hour expiration
        setWithExpiry('userId', data.id, 3600000); // 1 hour in milliseconds
        setWithExpiry('userName', data.name, 3600000);

        navigate('/service-provider-dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSignUp = () => {
    navigate('/service-provider-Sign');
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Service Provider Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="signup-button" onClick={handleSignUp}>
        Sign Up
      </button>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
};

export default CustomerLogin;

