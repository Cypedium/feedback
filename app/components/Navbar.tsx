'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleLogout } from '../utils/logout';
import styles from './Navbar.module.css';
import axios from 'axios';

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
        const response = await axios.get<User[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );

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
    <>
      <nav className={styles.nav}>
      <button className={styles.menuToggle}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : styles.closed}`}>
        <li onClick={() => setMenuOpen(false)}>
          <Link href="/feedback">Create Feedback</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link href="/">List of Feedback</Link>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <Link href="/register">Register User</Link>
        </li>

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
                      </>
                    )}
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;