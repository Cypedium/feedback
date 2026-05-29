'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { deleteFeedback } from './lib/endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


type Feedback = {
  _id?: string;
  rating: number;
  comment: string;
  productId: string;
  username: string;
  submittedAt: string;
};

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);
  const [startDate, setStartDate] = useState('');
  const [comment, setComment] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userName, setUserName] = useState('');

  const filteredFeedbacks = feedbacks.filter(fb => {
    // Search match
    const searchMatch =
      fb.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.productId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.submittedAt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.rating?.toString().includes(searchQuery) ||
      fb.comment?.toLowerCase().includes(searchQuery.toLowerCase());

    // Rating match
    const ratingMatch = fb.rating >= minRating && fb.rating <= maxRating;

    // Date match
    const submittedDate = new Date(fb.submittedAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const dateMatch =
      (!start || submittedDate >= start) &&
      (!end || submittedDate <= end);

    // Final condition: must match both search and filters
    return searchMatch && ratingMatch && dateMatch;
  });

  // Move deleteFeedbackCard outside useEffect so it's accessible in the component
  const deleteFeedbackCard = async (id: string) => {
    try {
      await deleteFeedback(id);
      setFeedbacks(prev => prev.filter(fb => fb._id !== id));
    } catch (err: any) {
      console.error('Error deleting feedback:', err);
      setError(err.message || 'Error deleting feedback');
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<Feedback[]>('http://localhost:4000/feedbacks');
        setFeedbacks(response.data);
      } catch (err: any) {
        console.error('Error fetching feedbacks:', err);
        setError(err.message || 'Error fetching feedbacks');
      }
    };

    const nameFromStorage = localStorage.getItem('username');
    setUserName(nameFromStorage || '');

    fetchFeedbacks();
  }, []);

  return (
    <div>
      <br /><br />
      <h1 className={styles.title}>Happy Feedbacks</h1>
      {feedbacks.length > 0 ? (
        <div className={styles.feedbackList}>
          {filteredFeedbacks.map((fb, index) => (
            <div className={styles.card} key={index}>
              <button className={styles.deleteButton} onClick={() => {
                if (userName === fb.username) {
                  if (confirm('Are you sure you want to delete this feedback?')) {
                    if (fb._id) {
                      deleteFeedbackCard(fb._id);
                    } else {
                      alert('Feedback ID is missing. Cannot delete.');
                    }
                  }
                } else {
                  alert('You can only delete your own feedback.');
              }}}
              >
                <FontAwesomeIcon icon={faTrash} style={{color: "darkred"}} />
              </button>
              <p><em><strong>Date:</strong></em> {fb.submittedAt.substring(0, 10)}</p>
              <p><em><strong>User: </strong></em> {fb.username}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ margin: 0 }}>
                  <em><strong>Rating:</strong></em>
                </p>
                <div className={styles.starRating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < fb.rating ? '' : styles.empty}>★</span>
                  ))}
                </div>
              </div>
              <p><em><strong>Product:</strong></em> {fb.productId}</p>
              <p><em><strong>Comment:</strong></em> {fb.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback found.</p>
      )
    }
  </div>
  );
}