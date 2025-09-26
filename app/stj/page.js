// app/stj/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./stj.module.css";
import ButtonGrid from "@/components/ButtonGrid";

export default function STJPage() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.mainTitle}>STJ TB Model</h1>
          <p className={styles.description}>
            STJ TB model คือ รูปแบบการเฝ้าระวัง ป้องกัน ควบคุมวัณโรค ที่พัฒนาขึ้นเพื่อตอบสนองต่อสถานการณ์วัณโรคในพื้นที่จังหวัดอุบลราชธานี โมเดลนี้เน้นการมีส่วนร่วมของชุมชน หน่วยงานสาธารณสุขทุกระดับ และภาคีเครือข่ายทุกภาคส่วน เพื่อให้การค้นหาผู้ป่วยและการดูแลผู้ป่วยวัณโรคเป็นไปอย่างมีคุณภาพ และประสิทธิภาพ
          </p>
          
          {/* --- แสดง ButtonGrid ที่เรียกใช้ปุ่มชุดใหม่ --- */}
                    <div className={styles.shortcutSection}>
            
            <ButtonGrid buttonIds={[18, 19, 20]} /> 
          </div>

          {/* --- เราได้ลบส่วนสารบัญ S, T, J ออกจากหน้านี้แล้ว --- */}
        </div>
      </main>
      <Footer />
    </div>
  );
}