// components/widgets/StatCard.js
import React from 'react';
import styles from './StatCard.module.css';

// Component นี้จะรับ props 3 อย่าง: title, value, และ unit
const StatCard = ({ title, value, unit }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
      <p className={styles.unit}>{unit}</p>
    </div>
  );
};

export default StatCard;