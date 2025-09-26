// components/TopicModal.js
"use client";
import React from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import styles from './TopicModal.module.css';

Modal.setAppElement('body'); // เพื่อ Accessibility

const TopicModal = ({ isOpen, onRequestClose, categoryData }) => {
  if (!categoryData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button onClick={onRequestClose} className={styles.closeButton}>×</button>
      <h2>{categoryData.letter} - {categoryData.title}</h2>
      <ul className={styles.topicList}>
        {categoryData.topics.map((topic) => (
          <li key={topic.slug}>
            <Link href={`/stj/${topic.slug}`} onClick={onRequestClose}>
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default TopicModal;