// app/situation/page.js
"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatCard from "@/components/widgets/StatCard";
import BarChart from "@/components/widgets/BarChart";
import styles from "./situation.module.css";

export default function SituationPage() {
  // State สำหรับเก็บข้อมูล Dashboard และสถานะการโหลด
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก API เมื่อเปิดหน้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // แสดงผลหน้า Loading... ระหว่างรอข้อมูล
  if (loading) {
    return (
        <div>
            <Header />
            <main className={styles.main}><div className={styles.container}><h2>Loading Dashboard...</h2></div></main>
            <Footer />
        </div>
    );
  }

  // ถ้าโหลดข้อมูลไม่สำเร็จ
  if (!data) {
    return (
        <div>
            <Header />
            <main className={styles.main}><div className={styles.container}><h2>ไม่สามารถโหลดข้อมูลได้</h2></div></main>
            <Footer />
        </div>
    );
  }

  // เมื่อโหลดข้อมูลสำเร็จแล้ว ให้แสดงผล Dashboard
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>สถานการณ์วัณโรค จ.อุบลราชธานี</h1>
          {/* ใช้ ?. และ || '' เพื่อป้องกัน error และแสดงค่าว่างแทนถ้าไม่มีข้อมูล */}
          <p className={styles.updateInfo}>ข้อมูลล่าสุด ณ {data?.lastUpdated || 'ไม่มีข้อมูล'}</p>
          
          <div className={styles.statsGrid}>
            <StatCard 
              title="เป้าหมาย" 
              value={data?.kpiCard?.target || 'N/A'} 
              unit="คน" 
            />
            <StatCard 
              title="ผลงาน" 
              value={data?.kpiCard?.result || 'N/A'} 
              unit="คน" 
            />
            <StatCard 
              title="ร้อยละ" 
              value={data?.kpiCard?.percentage || 'N/A'} 
              unit="%" 
            />
          </div>

          <div className={styles.chartContainer}>
            {/* ตรวจสอบว่ามีข้อมูลกราฟหรือไม่ก่อนแสดงผล */}
            {data?.screeningRateChart ? (
              <BarChart chartData={data.screeningRateChart} />
            ) : <p>ไม่มีข้อมูลสำหรับแสดงกราฟ</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}