// app/stj/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import stjData from "@/data/stjContent.json"; // Import ข้อมูลสารบัญ
import styles from "./stj.module.css";

export default function STJPage() {
  const { s, t, j } = stjData;

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* --- ส่วนที่ 1: คำอธิบายหลักของ STJ Model --- */}
          <h1 className={styles.mainTitle}>STJ Model</h1>
          <p className={styles.description}>
            STJ TB model คือ รูปแบบการเฝ้าระวัง ป้องกัน ควบคุมวัณโรค ที่พัฒนาขึ้นเพื่อตอบสนองต่อสถานการณ์วัณโรคในพื้นที่จังหวัดอุบลราชธานี โมเดลนี้เน้นการมีส่วนร่วมของชุมชน หน่วยงานสาธารณสุขทุกระดับ และภาคีเครือข่ายทุกภาคส่วน เพื่อให้การค้นหาผู้ป่วยและการดูแลผู้ป่วยวัณโรคเป็นไปอย่างมีคุณภาพ และประสิทธิภาพ 
          </p>
          <div className={styles.principles}>
            <div className={styles.principleCard}>
              <h2>S - Screening</h2>
              <p>กระบวนการค้นหาผู้ป่วยวัณโรคในชุมชน ได้อย่างรวดเร็วและมีประสิทธิภาพ </p>
            </div>
            <div className={styles.principleCard}>
              <h2>T – Treatment</h2>
              <p>กระบวนการรักษาผู้ป่วยวัณโรค ให้ได้รับการดูแลรักษาตามมาตรฐาน อย่างต่อเนื่องในชุมชนจนสิ้นสุดการรักษา</p>
            </div>
            <div className={styles.principleCard}>
              <h2>J – Join team</h2>
              <p>กระบวนการดูและผู้ป่วยวัณโรคและการเฝ้าระวัง ป้องกัน ในชุมชน  ด้วยการประสานงานภาคีเครือข่ายทุกภาคส่วน</p>
            </div>
          </div>
          <p></p>
          {/* --- ส่วนที่ 2: สารบัญลิงก์ไปยังหน้ารายละเอียด --- */}
          <div className={styles.category}>
            <h2>S - {s.title}</h2>
            <ul>
              {s.topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/stj/${topic.slug}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.category}>
            <h2>T - {t.title}</h2>
            <ul>
              {t.topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/stj/${topic.slug}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.category}>
            <h2>J - {j.title}</h2>
            <ul>
              {j.topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/stj/${topic.slug}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}