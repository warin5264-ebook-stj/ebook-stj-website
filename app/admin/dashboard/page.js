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
    { i: 'stat-new-patients', x: 0, y: 0, w: 4, h: 2 },
    { i: 'stat-success-rate', x: 4, y: 0, w: 4, h: 2 },
    { i: 'stat-deaths', x: 8, y: 0, w: 4, h: 2 },
    { i: 'chart-monthly', x: 0, y: 2, w: 12, h: 4 },
  ];

  // 1. สร้างข้อมูลตัวอย่างสำหรับกราฟ
  const mockChartData = {
    title: "สถิติผู้ป่วยวัณโรครายใหม่ (ตัวอย่าง)",
    labels: ['มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'],
    data: [65, 59, 80, 81]
  };

  const handleLayoutChange = (newLayout) => {
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
            cols={12}
            rowHeight={100}
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
              {/* 2. ส่งข้อมูลตัวอย่างเข้าไปใน BarChart Component */}
              <BarChart chartData={mockChartData} />
            </div>
          </GridLayout>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;