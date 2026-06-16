// app/api/endpoints.ts
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
export const registerUser = (user: User) => api.post('/auth/register', user);
export const loginUser = (user: User) => api.post('/auth/login', user);
export const logoutUser = () => api.post('/auth/logout');
export const refreshToken = () => api.post('/auth/refresh');

// FEEDBACK
export const submitFeedback = (feedback: Feedback) => api.post('/feedback', feedback);
export const getFeedbacks = () => api.get('/feedback');
export const deleteFeedback = (id: string) => api.delete(`/feedback/${id}`);

// USERS
export const getUsers = () => api.get('/users');

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  submitFeedback,
  getFeedbacks,
  getUsers,
  deleteFeedback
};