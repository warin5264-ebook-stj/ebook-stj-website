// app/admin/dashboard/edit/page.js
"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './edit.module.css';

// Import Tab components
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import สไตล์พื้นฐานของ Tabs

export default function AdminEditPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // --- ส่วนจัดการ State และ Functions ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Network response was not ok');
        const currentData = await response.json();
        setData(currentData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split('.');
    setData(prevData => ({
      ...prevData,
      [section]: { ...prevData[section], [key]: value }
    }));
  };
  
  const handleTableChange = (e, index, field) => {
    const { value } = e.target;
    const updatedRows = [...data.mainRiskTable.rows];
    const parsedValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    updatedRows[index][field] = parsedValue;
    setData(prevData => ({
      ...prevData,
      mainRiskTable: { ...prevData.mainRiskTable, rows: updatedRows }
    }));
  };

  const handleChartChange = (e, chartName, field) => {
    const { value } = e.target;
    let processedValue = value;
    if (field === 'data') {
      processedValue = value.split(',').map(item => parseFloat(item.trim()) || 0);
    }
    if (field === 'labels') {
      processedValue = value.split(',').map(item => item.trim());
    }
    setData(prevData => ({
      ...prevData,
      [chartName]: { ...prevData[chartName], [field]: processedValue }
    }));
  };

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

  // --- ส่วนจัดการการแสดงผล ---
  if (loading) {
    return (
      <div>
        <Header />
        <main className={styles.main}><div className={styles.container}>กำลังโหลดข้อมูล...</div></main>
        <Footer />
      </div>
    );
  }
  
  if (!data) {
    return (
      <div>
        <Header />
        <main className={styles.main}><div className={styles.container}>ไม่สามารถโหลดข้อมูลได้</div></main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1>จัดการข้อมูล Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <Tabs className={styles.tabs}>
              <TabList>
                <Tab>การ์ดสรุปตัวเลข</Tab>
                <Tab>ตารางกลุ่มเสี่ยง</Tab>
                <Tab>กราฟคัดกรอง</Tab>
                <Tab>กราฟกลุ่มเสี่ยง</Tab>
              </TabList>

              <TabPanel>
                <fieldset className={styles.fieldset}>
                  <legend>การ์ดสรุปตัวเลข (KPI Card)</legend>
                  <div className={styles.formGroup}><label htmlFor="kpi-target">เป้าหมาย</label><input id="kpi-target" type="text" name="kpiCard.target" value={data?.kpiCard?.target || ''} onChange={handleChange} /></div>
                  <div className={styles.formGroup}><label htmlFor="kpi-result">ผลงาน</label><input id="kpi-result" type="text" name="kpiCard.result" value={data?.kpiCard?.result || ''} onChange={handleChange} /></div>
                  <div className={styles.formGroup}><label htmlFor="kpi-percentage">ร้อยละ</label><input id="kpi-percentage" type="text" name="kpiCard.percentage" value={data?.kpiCard?.percentage || ''} onChange={handleChange} /></div>
                </fieldset>
              </TabPanel>

              <TabPanel>
                <fieldset className={styles.fieldset}>
                  <legend>ตารางกลุ่มเสี่ยงหลัก</legend>
                  <div className={styles.tableWrapper}><table className={styles.dataTable}><thead><tr><th>กลุ่มเสี่ยงหลัก</th><th>CXR All</th><th>CXR (-)</th><th>ร้อยละ 1</th><th>TB</th><th>ร้อยละ 2</th></tr></thead><tbody>{data.mainRiskTable.rows.map((row, index) => (<tr key={index}><td><input type="text" value={row.group} onChange={(e) => handleTableChange(e, index, 'group')} /></td><td><input type="number" value={row.cxrAll} onChange={(e) => handleTableChange(e, index, 'cxrAll')} /></td><td><input type="number" value={row.cxrNegative} onChange={(e) => handleTableChange(e, index, 'cxrNegative')} /></td><td><input type="number" step="0.01" value={row.percent1} onChange={(e) => handleTableChange(e, index, 'percent1')} /></td><td><input type="number" value={row.tb} onChange={(e) => handleTableChange(e, index, 'tb')} /></td><td><input type="number" step="0.01" value={row.percent2} onChange={(e) => handleTableChange(e, index, 'percent2')} /></td></tr>))}</tbody></table></div>
                </fieldset>
              </TabPanel>

              <TabPanel>
                <fieldset className={styles.fieldset}>
                  <legend>กราฟอัตราการคัดกรอง (screeningRateChart)</legend>
                  <div className={styles.formGroup}><label htmlFor="screening-title">หัวข้อกราฟ</label><input id="screening-title" type="text" value={data.screeningRateChart.title} onChange={(e) => handleChartChange(e, 'screeningRateChart', 'title')} /></div>
                  <div className={styles.formGroup}><label htmlFor="screening-labels">Labels (คั่นแต่ละรายการด้วยลูกน้ำ ,)</label><textarea id="screening-labels" rows="3" value={data.screeningRateChart.labels.join(', ')} onChange={(e) => handleChartChange(e, 'screeningRateChart', 'labels')} /></div>
                  <div className={styles.formGroup}><label htmlFor="screening-data">Data (คั่นแต่ละตัวเลขด้วยลูกน้ำ ,)</label><textarea id="screening-data" rows="3" value={data.screeningRateChart.data.join(', ')} onChange={(e) => handleChartChange(e, 'screeningRateChart', 'data')} /></div>
                </fieldset>
              </TabPanel>
              
              <TabPanel>
                <fieldset className={styles.fieldset}>
                  <legend>กราฟกลุ่มเสี่ยง (riskGroupChart)</legend>
                  <div className={styles.formGroup}><label htmlFor="risk-labels">Labels (คั่นแต่ละรายการด้วยลูกน้ำ ,)</label><textarea id="risk-labels" rows="3" value={data.riskGroupChart.labels.join(', ')} onChange={(e) => handleChartChange(e, 'riskGroupChart', 'labels')} /></div>
                  <div className={styles.formGroup}><label htmlFor="risk-data">Data (คั่นแต่ละตัวเลขด้วยลูกน้ำ ,)</label><textarea id="risk-data" rows="3" value={data.riskGroupChart.data.join(', ')} onChange={(e) => handleChartChange(e, 'riskGroupChart', 'data')} /></div>
                </fieldset>
              </TabPanel>
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