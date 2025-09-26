// app/admin/dashboard/edit/page.js
"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './edit.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// เราจะไม่ import initialData มาใช้โดยตรงแล้ว
// import initialData from '@/data/dashboards.json';

export default function AdminEditPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. เปลี่ยน useEffect ให้ดึงข้อมูลจาก API จริง
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Network response was not ok');
        const currentData = await response.json();
        setData(currentData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setMessage('ไม่สามารถโหลดข้อมูลได้');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- ฟังก์ชันจัดการ State (เหมือนเดิม) ---
  const handleValueChange = (dashboardKey, field, value) => {
    setData(prev => ({ ...prev, [dashboardKey]: { ...prev[dashboardKey], [field]: value } }));
  };

  const handleTableChange = (e, dashboardKey, rowIndex, cellKey) => {
    const { value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) || 0 : value;
    const updatedRows = [...data[dashboardKey].table.rows];
    updatedRows[rowIndex][cellKey] = parsedValue;
    setData(prev => ({ ...prev, [dashboardKey]: { ...prev[dashboardKey], table: { ...prev[dashboardKey].table, rows: updatedRows } } }));
  };

  const addTableRow = (dashboardKey) => {
    const newRow = { id: `new-${Date.now()}` };
    const firstRow = data[dashboardKey].table.rows[0];
    if(firstRow){
      Object.keys(firstRow).forEach(key => {
        if (key !== 'id') newRow[key] = typeof firstRow[key] === 'number' ? 0 : '';
      });
    }
    const updatedRows = [...data[dashboardKey].table.rows, newRow];
    setData(prev => ({ ...prev, [dashboardKey]: { ...prev[dashboardKey], table: { ...prev[dashboardKey].table, rows: updatedRows } } }));
  };

  const deleteTableRow = (dashboardKey, rowIndex) => {
    const updatedRows = data[dashboardKey].table.rows.filter((_, index) => index !== rowIndex);
    setData(prev => ({ ...prev, [dashboardKey]: { ...prev[dashboardKey], table: { ...prev[dashboardKey].table, rows: updatedRows } } }));
  };

  // 2. เปลี่ยน handleSubmit ให้ส่งข้อมูลไปที่ API จริง
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('กำลังบันทึก...');
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save data');
      const result = await response.json();
      setMessage('บันทึกข้อมูลสำเร็จ!');
    } catch (error) {
      setMessage('เกิดข้อผิดพลาดในการบันทึก!');
      console.error(error);
    }
  };
  
  // --- ส่วนแสดงผล (Render) ---
  if (loading) {
    return (
        <div>
            <Header/>
            <main className={styles.main}><div className={styles.container}>กำลังโหลดข้อมูลจากฐานข้อมูล...</div></main>
            <Footer/>
        </div>
    );
  }
  
  if (!data) {
    return (
        <div>
            <Header/>
            <main className={styles.main}><div className={styles.container}>ไม่สามารถโหลดข้อมูลได้ โปรดตรวจสอบการเชื่อมต่อ</div></main>
            <Footer/>
        </div>
    );
  }

  // --- โค้ด JSX ทั้งหมดเหมือนเดิมทุกประการ ---
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>จัดการข้อมูล Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <Tabs className={styles.tabs}>
                {/* ... โค้ด Tabs, TabList, Tab, TabPanel ทั้งหมดเหมือนเดิม ... */}
            </Tabs>
            <button type="submit" className={styles.saveButton}>บันทึกการเปลี่ยนแปลง</button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}