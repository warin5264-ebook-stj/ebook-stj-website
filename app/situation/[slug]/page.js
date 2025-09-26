// app/situation/[slug]/page.js
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatCard from '@/components/widgets/StatCard';
import styles from './dashboard-display.module.css';
import { kv } from '@vercel/kv';
import initialData from '@/data/dashboards.json';

// --- ย้ายการดึงข้อมูลมาไว้บน Server ---
async function getDashboardData(slug) {
  try {
    const data = await kv.get('dashboards_data');
    if (data && data[slug]) {
      return data[slug];
    }
    // ถ้าไม่มีใน KV ให้ใช้ข้อมูลเริ่มต้น
    return initialData[slug] || null;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
    return null;
  }
}

export default async function DashboardDisplayPage({ params }) {
  const { slug } = params;
  const data = await getDashboardData(slug);

  if (!data) {
    return <div>Could not load dashboard data.</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>{data.title}</h1>
          <div className={styles.kpiContainer}>
            <StatCard title={data.kpi.label} value={data.kpi.value} unit={data.kpi.unit} />
          </div>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  {data.table.headers.map(header => <th key={header}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.table.rows.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}