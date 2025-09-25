// components/InteractiveCard.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './InteractiveCard.module.css';

const InteractiveCard = ({ letter, title, description, hoverImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  // สำหรับมือถือ: แตะเพื่อสลับ
  const handleClick = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`${styles.content} ${isHovered ? styles.hidden : ''}`}>
        <h2 className={styles.title}><span className={styles.letter}>{letter}</span> - {title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={`${styles.imageWrapper} ${isHovered ? styles.visible : ''}`}>
        <Image 
          src={hoverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default InteractiveCard;