'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleLogout } from '../utils/logout';
import './Navbar.css';
import axios from 'axios';
import pic from '../public/images/pic2.png';

type User = {
  username: string;
  pictureUrl: string;
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:4000/users');
        setUsers(response.data);
      } catch (err: any) {
        console.error('Error fetching feedbacks:', err);
      }
    };

    const token = localStorage.getItem('token');
    const nameFromStorage = localStorage.getItem('username');

    setIsLoggedIn(!!token);
    setUserName(nameFromStorage || '');
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (userName && users.length > 0) {
      console.log('PictureLink', users.find(u => u.username === userName)?.pictureUrl);
      console.log('User', users.find(u => u.username === userName)?.username);
    }
  }, [users, userName]);

  return (
    <nav className="nav">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link href="/feedback">Write a opinion</Link></li>
        <li><Link href="/">List of opinion</Link></li>
        <li><Link href="/register">Register new user</Link></li>

        {!isLoggedIn && (
          <li><Link href="/login">Login</Link></li>
        )}

        {isLoggedIn && (
          <>
            <li key="logout">
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li className="profile-link" key="profile">
              <Link href="/profile">
                <div className="profile-container">
                  {userName && (
                    <>
                      <span className="profile-name">{userName}</span>
                      <img src={pic.src} width={60} height={50} />
                    </>
                  )}
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;