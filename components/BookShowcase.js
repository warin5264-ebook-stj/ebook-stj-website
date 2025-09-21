// components/BookShowcase.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './BookShowcase.module.css';
import booksData from '../data/books.json';

const BookShowcase = () => {
  return (
    <section className={styles.showcaseSection}>
      <h2 className={styles.title}>หนังสือแนะนำ (อ่านฟรี)</h2>
      <div className={styles.bookGrid}>
        {booksData.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            {/* --- บรรทัดที่แก้ไขคือบรรทัดนี้ --- */}
            <Link href={`/ebook/${book.slug}`} className={styles.cardLink}>
              <div className={styles.imageContainer}>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={300}
                  height={450}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <div className={styles.tags}>
                  {book.tags.map(tag => (
                    <span key={tag} className={`${styles.tag} ${styles[tag]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookShowcase;