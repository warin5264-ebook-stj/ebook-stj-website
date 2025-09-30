// app/about/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "./about.module.css"; // Import CSS สำหรับหน้านี้

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>เกี่ยวกับโครงการของเรา</h1>
            <p>
              E-Book STJ TB Model เกิดจากการพัฒนารูปแบบการเฝ้าระวัง ป้องกัน ควบคุมวัณโรค จังหวัดอุบลราชธานี เพื่อเผยแพร่ความรู้ความเข้าใจเกี่ยวกับวัณโรคและการป้องกัน
              ผ่านโมเดลการทำงานที่มีประสิทธิภาพและเข้าถึงง่าย
            </p>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.missionCard}>
            <h2>ภารกิจของเรา</h2>
            <p>
              เพื่อพัฒนารูปแบบการเฝ้าระวัง ป้องกัน ควบคุมวัณโรคในจังหวัดอุบลราชธานี เพื่อลดอัตราการป่วยและเสียชีวิตจากวัณโรคในพื้นที่
              โดยการสร้างเสริมความรู้และส่งเสริมการมีส่วนร่วมของชุมชนในการเฝ้าระวังและป้องกันโรค
            </p>
          </div>

          <div className={styles.teamSection}>
            <h2>ทีมงาน</h2>
            <p>ได้รับการสนับสนุนและพัฒนารูปแบบ โดยทีมงานป้องกันควบคุมวัณโรค กลุ่มงานควบคุมโรคติดต่อ สำนักงานสาธารณสุขจังหวัดอุบลราชธานี</p>
            {/* สามารถเพิ่มรูปและรายชื่อทีมงานตรงนี้ได้ */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}