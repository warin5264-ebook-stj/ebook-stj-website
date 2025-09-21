// components/Counter.js
"use client";
import React, { useState, useEffect } from 'react';
import styles from './Counter.module.css'; // Import CSS

const Counter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setVisitorCount(1520);
      setDownloadCount(488);
    }, 500);
  }, []);

  // ฟังก์ชันดาวน์โหลดจะถูกแก้ไขในข้อ 3
  const handleDownload = () => {
    window.location.href = '/STJ-Model-Info.pdf'; // เปลี่ยนชื่อไฟล์ให้ตรง
  };

  return (
    <div className={styles.counterSection}>
      <div className={styles.stat}>
        <h3>ยอดเข้าชมวันนี้</h3>
        <p>{visitorCount.toLocaleString()}</p>
      </div>
      <div className={styles.stat}>
        <h3>ยอดดาวน์โหลด E-Book</h3>
        <p>{downloadCount.toLocaleString()}</p>
      </div>
      {/* <button className={styles.downloadButton} onClick={handleDownload}>
        ดาวน์โหลดข้อมูล
      </button> */}
    </div>
  );
};
export default Counter;