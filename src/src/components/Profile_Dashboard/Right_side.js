import React, { useState, useEffect } from "react";
import axios from "axios";

const RightSide = () => {
  const [userDetails, setUserDetails] = useState([]);
  const userId = 1; // Replace with the actual user ID of the logged-in user

  useEffect(() => {
    // Fetch all user details from the backend
    axios
      .get("http://localhost:3002/profile")
      .then((response) => {
        // Assuming response.data is an array of user details
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  // Filter the user details to show only the current user
  const currentUser = userDetails.find(
    (user) => user.user_detail_id === userId
  );

  return (
    <div className="right-side-container">
      {currentUser ? (
        <div className="info-box">
          <span>Name: {currentUser.name}</span>
          <br />
          <span>Email: {currentUser.email}</span>
          <br />
          <span>Phone Number: {currentUser.phone_number}</span>
          <br />
          <span>Address: {currentUser.address}</span>
          <br />
          <span>Gender: {currentUser.gender}</span>
          <br />
          <span>Pincode: {currentUser.pin_code}</span>
          <br />
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default RightSide;
