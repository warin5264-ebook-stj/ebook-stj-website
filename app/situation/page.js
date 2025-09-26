// app/situation/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import styles from "./situation.module.css";
import dashboardsData from "@/data/dashboards.json";

export default function SituationHubPage() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>สถานการณ์วัณโรค จ.อุบลราชธานี</h1>
          <p className={styles.updateInfo}>เลือก Dashboard ที่คุณสนใจเพื่อดูข้อมูลล่าสุด</p>
          
          <div className={styles.dashboardLinks}>
            <Link href="/situation/xray" className={styles.dashboardCard}>
              <h2>{dashboardsData.xray.title}</h2>
              <p>ดูข้อมูล →</p>
            </Link>
            <Link href="/situation/registration" className={styles.dashboardCard}>
              <h2>{dashboardsData.registration.title}</h2>
              <p>ดูข้อมูล →</p>
            </Link>
            <Link href="/situation/treatment" className={styles.dashboardCard}>
              <h2>{dashboardsData.treatment.title}</h2>
              <p>ดูข้อมูล →</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}