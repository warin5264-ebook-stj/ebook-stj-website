// components/Header.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/stj', label: 'STJ TB Model' },
  { href: '/ebook', label: 'E-Book' },
  { href: '/situation', label: 'สถานการณ์' },
  { href: '/assessment', label: 'แบบประเมินความเสี่ยงวัณโรค' }, // <-- เพิ่มบรรทัดนี้
  { href: '/about', label: 'เกี่ยวกับเรา' },
  
  // { href: '/contact', label: 'ติดต่อเรา' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">E-Book STJ TB Model</Link>
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>
    </header>
  );
};

export default Header;