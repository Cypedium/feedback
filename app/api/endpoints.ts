import api from './api';

type Feedback = {
  _id?: string;
  rating: number;
  comment: string;
  productId: string;
  username: string;
  submittedAt: string;
};

type User = {
  username: string;
  password: string;
  pictureUrl: string;
};

// AUTH 
export const registerUser = (user: User) => api.post('/register', user);
export const loginUser = (user: User) => api.post('/login', user);
export const logoutUser = () => api.post('/logout');

// FEEDBACK
export const submitFeedback = (feedback: Feedback) => api.post('/feedback', feedback);
export const getFeedbacks = () => api.get('/feedbacks');
export const deleteFeedback = (id: string) => api.delete(`/feedback/${id}`);

// USERS
export const getUsers = () => api.get('/users');

export default {
  registerUser,
  loginUser,
  logoutUser,
  submitFeedback,
  getFeedbacks,
  getUsers,
  deleteFeedback
};