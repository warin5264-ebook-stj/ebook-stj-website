// components/FadeInOnScroll.js
"use client";

import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './FadeInOnScroll.module.css';

const FadeInOnScroll = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // ให้ Animation ทำงานแค่ครั้งเดียว
    threshold: 0.1,    // ให้เริ่มทำงานเมื่อเห็น Component 10%
  });

  return (
    <div
      ref={ref}
      className={`${styles.fadeInSection} ${inView ? styles.isVisible : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;