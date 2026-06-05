'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { handleLogout } from '../utils/logout';
import styles from './Navbar.module.css';
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
        const response = await axios.get<User[]>(process.env.NEXT_PUBLIC_API_URL + '/users');
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
    <nav className={styles.nav}>
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
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
            <li className={styles.profileLink} key="profile">
              <Link href="/profile">
                <div className={styles.profileContainer}>
                  {userName && (
                    <>
                      <span className={styles.profileName}>{userName}</span>
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