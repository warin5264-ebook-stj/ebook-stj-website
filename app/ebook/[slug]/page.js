// app/ebook/[slug]/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { notFound } from 'next/navigation';

import booksData from "@/data/books.json"; // Import ข้อมูลหนังสือ
import styles from "./ebook-detail.module.css"; // Import CSS

// ฟังก์ชันนี้จะหาข้อมูลหนังสือจาก slug ที่ได้รับมา
function getBookData(slug) {
  const book = booksData.find((book) => book.slug === slug);
  return book;
}

export default function BookDetailPage({ params }) {
  const { slug } = params;
  const book = getBookData(slug);

  // ถ้าหาหนังสือไม่เจอ ให้แสดงหน้า 404 Not Found
  if (!book) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image
              src={book.image}
              alt={book.title}
              width={400}
              height={600}
              className={styles.bookCover}
              priority // ให้โหลดรูปปกนี้ก่อน
            />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.tags}>
              {book.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <h1 className={styles.title}>{book.title}</h1>
            <p className={styles.description}>{book.description}</p>
            <div className={styles.fullContent}>
              <h3>เนื้อหาเบื้องต้น</h3>
              <p>{book.fullContent}</p>
            </div>
            <div className={styles.buttonGroup}>
              <a 
                href={book.readOnlineUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                อ่านเลย
              </a>
              {/* <a 
                href={book.downloadPdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                ดาวน์โหลด PDF ตรงนี้
              </a> */}
            </div>
            {/* ในอนาคตสามารถเพิ่มปุ่มดาวน์โหลดตรงนี้ได้ */}
            {/* <button className={styles.downloadButton}>ดาวน์โหลด PDF</button> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}