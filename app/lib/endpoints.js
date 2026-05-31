import api from './api';

export const registerUser = (data) => api.post('/register', data, {withCredentials: true});
export const loginUser = (data) => api.post('/login', data);
export const logoutUser = () => api.post('/logout');
export const submitFeedback = (Feedback) => api.post('/feedback', Feedback);
export const getFeedbacks = () => api.get('/feedbacks');
export const getUsers = () => api.get('/users');
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);