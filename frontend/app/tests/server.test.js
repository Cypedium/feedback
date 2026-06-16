const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = require('../app');
const User = require('../models/User');
const Feedback = require('.././models/Feedback');

jest.mock('../models/User');
jest.mock('../models/Feedback');

const JWT_SECRET = '458899HelpMe!';

describe('Auth & Feedback API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Register
  it('should register a user', async () => {
    const mockSave = jest.fn().mockResolvedValue({});
    User.mockImplementation(() => ({ save: mockSave }));

    const res = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'testpass' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered successfully.');
    expect(mockSave).toHaveBeenCalled();
  });

  // 🔐 Login
  it('should login a user with correct credentials', async () => {
    const passwordHash = await bcrypt.hash('testpass', 10);
    User.findOne.mockResolvedValue({ _id: '123', username: 'testuser', passwordHash });

    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should reject login with invalid credentials', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/login')
      .send({ username: 'wronguser', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials.');
  });

  // 🚪 Logout
  it('should logout user', async () => {
    const res = await request(app).post('/logout');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/Logged out successfully/);
  });

  // 💬 Submit feedback
  it('should save feedback', async () => {
    Feedback.mockImplementation(() => ({ save: jest.fn().mockResolvedValue({}) }));

    const res = await request(app)
      .post('/feedback')
      .send({ rating: 5, comment: 'Great!', productId: 'abc123' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Feedback saved successfully!');
  });

  // 📊 Get all feedback
  it('should fetch all feedbacks', async () => {
    const mockFeedbacks = [{ rating: 5, comment: 'Nice' }];
    Feedback.find.mockResolvedValue(mockFeedbacks);

    const res = await request(app).get('/feedback');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockFeedbacks);
  });

  // 🧑‍🤝‍🧑 Get all users
  it('should fetch all users with username and pictureUrl', async () => {
    const mockUsers = [{ username: 'testuser', pictureUrl: 'http://pic.url' }];
    User.find.mockResolvedValue(mockUsers);

    const res = await request(app).get('/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });
});