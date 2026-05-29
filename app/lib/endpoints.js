import api from './api';

export const registerUser = (data) => api.post('/register', data, {withCredentials: true});
export const loginUser = (data) => api.post('/login', data); //Todo:
export const logoutUser = () => api.post('/logout'); //Todo:
export const submitFeedback = (Feedback) => api.post('/feedback', Feedback);
export const getFeedbacks = () => api.get('/feedbacks'); //Todo:
export const getUsers = () => api.get('/users'); //Todo:
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);