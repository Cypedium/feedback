'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Feedback.module.css';
import { submitFeedback } from '../lib/endpoints';
import DatePicker, { registerLocale } from 'react-datepicker';
import { sv } from 'date-fns/locale/sv'; // Swedish locale (starts week on Monday)
import leoProfanity from "leo-profanity";

registerLocale('sv', sv);
leoProfanity.loadDictionary(); // English
leoProfanity.loadDictionary('sv'); // Swedish

export default function Feedback() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [productId, setProductId] = useState<string>('');
  const router = useRouter();
  const datePickerRef = useRef<any>(null);

  const username = localStorage.getItem('username');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Client-side profanity check
  if (leoProfanity.check(comment) || leoProfanity.check(productId)) {
    setMessage("Your text contains inappropriate language. Please remove it and try again.");
    return;
  }

    try {
        const res = await submitFeedback({
          rating,
          comment,
          productId,
          username,
        });
        const feedbackResult = res.data;
        if (res.status !== 200) {
          setMessage(feedbackResult.message || 'Failed to submit feedback.');
          return;
        }
        
        setMessage(feedbackResult.message || 'Feedback submitted!');
        setRating(0);
        setComment('');
        setProductId('');
        // ✅ Redirect after successful submission
        //without next.js window.location.href = 'http://localhost:3000';
        // Delay the redirect slightly to allow users to see the success message
        setTimeout(() => {
          router.push("/");
        }, 5000); 
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to submit feedback.');
    }
  };


  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className={styles.container}>
      <br />
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <label>Rating:</label>
          <div className={styles.starRating}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`${styles.star} ${index < rating ? styles.filled : ''}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>
          <br />
          <label>Product:</label>
          <textarea
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Add your product here"
            required
            className={styles.textarea}
          />
          <label>Date:</label>
          <div className={styles.dateBox}>
            <DatePicker
                ref={datePickerRef}
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Pick a date"
                required
                locale="sv"
                className={styles.dateInput}
            />
            <span
              className={styles.dateIcon}
              onClick={() => datePickerRef.current?.setOpen(true)}
            >📅</span>
          </div>

          <br />
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <br />
          <button className={styles.submitButton} type="submit">
            Submit Feedback
          </button>
          {message && <p style={{ marginTop: '12px' }}>{message}</p>}
          <br />
        </form>
      </main>
    </div>
  );
}