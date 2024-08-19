import React from 'react';
import Navbar from '../Profile_Dashboard/Navbar';
import Footer from '../Dashboard/Footer';
import { useState,useEffect } from 'react';
import axios from 'axios';
import '../Dashboard/About.css';


const AboutUsPage = () => {

  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState([]);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3002/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reviewText && userName) {
      try {
        // Post the new review to the backend
        await axios.post("http://localhost:3002/insert_review", {
          description: reviewText,
          user_name: userName,
        });

        // Fetch updated reviews after posting
        const response = await axios.get("http://localhost:3002/reviews");
        setReviews(response.data);

        // Clear the form fields
        setReviewText("");
        setUserName("");
        alert("Your review was submitted successfully.");
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      alert("Please fill in both fields.");
    }
  };


  return (

    <div className='mainAbout'>
      
    <div style={styles.container}>
      <header style={styles.heroSection} >
        <div style={styles.overlay}></div>
        <h1 style={styles.heroHeading}>About Us</h1>
        <p style={styles.heroText}>Crafting Excellence, Delivering Results.</p>
      </header>

      <section style={styles.section}>
        <Navbar/>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionHeading}>Our Mission</h2>
          <p style={styles.sectionText}>
            We are dedicated to providing top-notch services that empower businesses to thrive. Our mission is to deliver quality solutions with integrity and innovation.
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionContent}>
          <h2 style={styles.sectionHeading}>Our Values</h2>
          <div style={styles.valuesGrid}>
            <div style={styles.valueCard}>
              <h3 style={styles.valueTitle}>Integrity</h3>
              <p style={styles.valueText}>We believe in doing the right thing, always.</p>
            </div>
            <div style={styles.valueCard}>
              <h3 style={styles.valueTitle}>Innovation</h3>
              <p style={styles.valueText}>We strive to lead with creativity and boldness.</p>
            </div>
            <div style={styles.valueCard}>
              <h3 style={styles.valueTitle}>Excellence</h3>
              <p style={styles.valueText}>We are committed to achieving outstanding results.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.teamSection}>
        <h2 style={styles.sectionHeading}>Meet Our Team</h2>
        <div style={styles.teamGrid}>
          <div style={styles.teamCard}>
            <img src="https://via.placeholder.com/150" alt="Pragati Kumrawat" style={styles.teamImage} />
            <h3 style={styles.teamName}>Pragati Kumrawat</h3>
          </div>
          <div style={styles.teamCard}>
            <img src="https://via.placeholder.com/150" alt="Shreya Dakhale" style={styles.teamImage} />
            <h3 style={styles.teamName}>Shreya Dakhale</h3>
          </div>
          <div style={styles.teamCard}>
            <img src="https://via.placeholder.com/150" alt="Nehal Patel" style={styles.teamImage} />
            <h3 style={styles.teamName}>Nehal Patel</h3>
          </div>
        </div>
      </section>

      <section className="key-features-section">
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Verified Professionals:</strong> All service providers are
            vetted and verified for quality and reliability.
          </li>
          <li>
            <strong>User Reviews:</strong> Read and leave reviews to help others
            make informed decisions.
          </li>
          <li>
            <strong>Easy Booking:</strong> Book services directly through our
            platform with a few simple steps.
          </li>
          <li>
            <strong>Customer Support:</strong> Our support team is available to
            assist you with any questions or issues.
          </li>
        </ul>
      </section>

      <section className="reviews-section">
        <h2>What Our Users Say</h2>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <p>"{review.description}"</p>
              <span>- {review.user_name}</span>
            </div>
          ))}
        </div>

        <div className="review-form-container">
          <h3>Submit Your Review</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
              required
            ></textarea>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
        <Footer />
      </section>
    </div>
</div>
  );
};



const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
    lineHeight: '1.6',
    backgroundColor: '#f4f4f4',
  },
  heroSection: {
    position: 'relative',
    backgroundImage: 'url("https://via.placeholder.com/1200x500")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroHeading: {
    fontSize: '4em',
    zIndex: 1,
    marginBottom: '20px',
  },
  heroText: {
    fontSize: '1.5em',
    zIndex: 1,
  },
  section: {
    padding: '60px 20px',
    backgroundColor: '#fff',
  },
  sectionContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionHeading: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#1e88e5',
  },
  sectionText: {
    fontSize: '1.2em',
    marginBottom: '20px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    marginTop: '40px',
  },
  valueCard: {
    backgroundColor: '#1e88e5',
    color: '#fff',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  valueTitle: {
    fontSize: '1.5em',
    marginBottom: '10px',
  },
  valueText: {
    fontSize: '1.1em',
  },
  valueCardHover: {
    transform: 'translateY(-10px)',
  },
  teamSection: {
    padding: '60px 20px',
    backgroundColor: '#f4f4f4',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '40px',
    justifyItems: 'center',
  },
  teamCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  teamImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  teamName: {
    fontSize: '1.5em',
    marginBottom: '10px',
  },
  teamRole: {
    fontSize: '1.1em',
    color: '#555',
  },
  teamCardHover: {
    transform: 'translateY(-10px)',
  },
  footer: {
    backgroundColor: '#1e88e5',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
  },
  footerText: {
    margin: 0,
    fontSize: '1em',
  },
};

export default AboutUsPage;
