import React, { useState, useEffect } from 'react';

const UserCardComponent = ({ userId }) => {
  const [bookingData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch Data on Component Mount using Fetch API
  useEffect(() => {
    if (!userId) return; // Skip fetching if userId is not available

    fetch('http://localhost:8080/api/v1/helper/myrequest/' + userId) // Replace with your GET API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON data
      })
      .then((data) => {
        setUserData(data); // Assuming data is an array of JSON objects
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); // Stop loading when done
      });
  }, [userId]);

  // Handle Accept Button Click using Fetch API
  const handleAccept = (booking) => {
    fetch('http://localhost:8080/api/v1/bookings/confirm', { // Replace with your POST API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "booking": booking, "userid": userId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log('Accepted:', data);
        window.location.reload(); // Reload the page after successful API call
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div className="booking-card-container">
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : bookingData.length === 0 ? (
        <p>No bookings are present.</p> // Show message when no bookings are found
      ) : (
        bookingData.map((booking, index) => (
          <div className="booking-card" key={index} style={styles.card}>
            <h3>{booking.name}</h3>
            <p><strong>ID:</strong> {booking.id}</p>
            <p><strong>Username:</strong> {booking.username}</p>
            <p><strong>Address:</strong> {booking.address}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Duration:</strong> {booking.duration}</p>
            <p><strong>Pin Code:</strong> {booking.pincode}</p>
            <button onClick={() => handleAccept(booking)} style={styles.button}>
              Accept
            </button>
          </div>
        ))
      )}
    </div>
  );
};

// Basic Styles for Cards and Buttons
const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    margin: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default UserCardComponent;
