// app/situation/[slug]/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dashboardsData from "@/data/dashboards.json";
import { notFound } from "next/navigation";
import StatCard from "@/components/widgets/StatCard";
import DataTable from "@/components/widgets/DataTable";
import BarChart from "@/components/widgets/BarChart";
import styles from "./dashboard-display.module.css";

export default function DashboardDisplayPage({ params }) {
  const { slug } = params;
  const data = dashboardsData[slug];

  if (!data) {
    notFound();
  }

  // --- คำนวณข้อมูลสำหรับตาราง registration ---
  if (slug === 'registration') {
    data.tables.forEach(table => {
      table.rows = table.rows.map(row => ({
        ...row,
        total: row.new + row.relapse // สร้างคอลัมน์ "รวม"
      }));
    });
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.mainTitle}>{data.mainTitle}</h1>
            <h2 className={styles.subtitle}>ปีงบประมาณ {data.fiscalYear} จังหวัดอุบลราชธานี</h2>
          </div>
          
          

          {data.charts.map((chart, index) => (
            <div key={index} className={styles.widgetContainer}>
              {chart.type === 'bar' && <BarChart chartData={chart} />}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}