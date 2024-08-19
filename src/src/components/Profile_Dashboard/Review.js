import React from 'react';

// Inline styles
const styles = {
  reviewsContainer: {
    padding: '20px',
    maxWidth: '100%',
    margin: 'auto',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  reviewsList: {
    display: 'flex',
    overflowX: 'auto',
    padding: '10px',
    gap: '15px',
    scrollSnapType: 'x mandatory',
  },
  reviewCard: {
    minWidth: '300px',
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    scrollSnapAlign: 'start',
    flexShrink: '0',
  },
  cardHeading: {
    marginTop: '0',
    fontSize: '1.2em',
  },
  cardParagraph: {
    margin: '5px 0',
  },
};

const reviews = [
  {
    id: 1,
    name: "John Doe",
    date: "August 10, 2024",
    rating: 5,
    comment: "Excellent service! Highly recommend."
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "August 15, 2024",
    rating: 4,
    comment: "Good experience, but there is room for improvement."
  },
  {
    id: 3,
    name: "Alice Johnson",
    date: "August 20, 2024",
    rating: 3,
    comment: "Average service. It took longer than expected."
  },
  // Add more reviews as needed
];

const ReviewsPage = () => {
  return (
    <div style={styles.reviewsContainer}>
      <h2 style={styles.heading}>Customer Reviews</h2>
      <div style={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} style={styles.reviewCard}>
            <h3 style={styles.cardHeading}>{review.name}</h3>
            <p style={styles.cardParagraph}><strong>Date:</strong> {review.date}</p>
            <p style={styles.cardParagraph}><strong>Rating:</strong> {review.rating} / 5</p>
            <p style={styles.cardParagraph}><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
