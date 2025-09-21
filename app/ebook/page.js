// app/ebook/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookShowcase from "@/components/BookShowcase"; // 1. Import Component ที่เราจะใช้ซ้ำ
import styles from "./ebook.module.css"; // 2. Import CSS สำหรับหน้านี้

export default function EbookPage() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>คลัง E-Book ทั้งหมด</h1>
          <p className={styles.subtitle}>
            เลือกอ่านหนังสือให้ความรู้เกี่ยวกับสุขภาพและวัณโรคได้ฟรี
          </p>
        </div>

        {/* 3. นำ Component BookShowcase มาใช้งานที่นี่ได้เลย */}
        <BookShowcase />

      </main>
      <Footer />
    </div>
  );
}