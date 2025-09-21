// app/contact/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1>ติดต่อเรา</h1>
          <p>เรายินดีรับฟังความคิดเห็นและตอบทุกข้อสงสัยของคุณ</p>
        </div>

        <div className={styles.container}>
          <div className={styles.contactInfo}>
            <h2>ข้อมูลการติดต่อ</h2>
            <p><strong>ที่อยู่:</strong> (ใส่ที่อยู่ของ สสจ. ที่นี่)</p>
            <p><strong>โทรศัพท์:</strong> (ใส่เบอร์โทรศัพท์ที่นี่)</p>
            <p><strong>อีเมล:</strong> (ใส่อีเมลที่นี่)</p>

            {/* ส่วนของฟอร์มติดต่อ (ตอนนี้เป็นแค่หน้าตา ยังส่งจริงไม่ได้) */}
            <h2 className={styles.formTitle}>ส่งข้อความถึงเรา</h2>
            <form className={styles.contactForm}>
              <input type="text" placeholder="ชื่อของคุณ" required />
              <input type="email" placeholder="อีเมลของคุณ" required />
              <textarea placeholder="ข้อความของคุณ" rows="5" required></textarea>
              <button type="submit">ส่งข้อความ</button>
            </form>
          </div>

          <div className={styles.map}>
            {/* คุณต้องไปที่ Google Maps, ค้นหาสถานที่, กด Share > Embed a map แล้ว copy iframe code มาวางแทนตรงนี้ */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.691151121013!2d104.85194187590216!3d15.23469278539223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31165236b23b1849%3A0x64835e339843648!2z4LiB4Lij4Li44LiH4LmA4LiK4Li14Lii4LiU4Li04Liq4Liy4Lir4Liy4Liq4LiV4Lij4LmM4Lie4Lix4LiS4LiZ4Liy4LiB4Lij4LmM!5e0!3m2!1sth!2sth!4v1726474171120!5m2!1sth!2sth"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}