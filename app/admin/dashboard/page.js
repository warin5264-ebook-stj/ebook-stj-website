// app/admin/dashboard/page.js
"use client";

import React from 'react';
import GridLayout from 'react-grid-layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatCard from '@/components/widgets/StatCard';
import BarChart from '@/components/widgets/BarChart';
import styles from './admin-dashboard.module.css';

// Import CSS ของไลบรารี
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const AdminDashboardPage = () => {
  // กำหนด Layout เริ่มต้น
  const initialLayout = [
    // { i: 'key', x: ตำแหน่งแนวนอน, y: ตำแหน่งแนวตั้ง, w: ความกว้าง, h: ความสูง }
    { i: 'stat-new-patients', x: 0, y: 0, w: 4, h: 2 },
    { i: 'stat-success-rate', x: 4, y: 0, w: 4, h: 2 },
    { i: 'stat-deaths', x: 8, y: 0, w: 4, h: 2 },
    { i: 'chart-monthly', x: 0, y: 2, w: 12, h: 4 },
  ];

  const handleLayoutChange = (newLayout) => {
    // ในอนาคต เราจะส่ง newLayout ไปบันทึกที่ API -> Vercel KV
    console.log("New Layout:", newLayout);
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>จัดการ Dashboard</h1>
          <p className={styles.subtitle}>คุณสามารถลากเพื่อย้ายตำแหน่ง และลากมุมขวาล่างเพื่อปรับขนาดได้</p>
          
          <GridLayout
            className="layout"
            layout={initialLayout}
            cols={12} // แบ่ง Grid ทั้งหมดเป็น 12 คอลัมน์
            rowHeight={100} // แต่ละแถวสูง 100px
            width={1200}
            onLayoutChange={handleLayoutChange}
          >
            <div key="stat-new-patients" className={styles.widget}>
              <StatCard title="ผู้ป่วยรายใหม่ (สะสมปีนี้)" value="1,234" unit="คน" />
            </div>
            <div key="stat-success-rate" className={styles.widget}>
              <StatCard title="อัตราความสำเร็จการรักษา" value="85" unit="%" />
            </div>
            <div key="stat-deaths" className={styles.widget}>
              <StatCard title="เสียชีวิต (สะสมปีนี้)" value="56" unit="คน" />
            </div>
            <div key="chart-monthly" className={styles.widget}>
              <BarChart />
            </div>
          </GridLayout>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;