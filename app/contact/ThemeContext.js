// app/context/ThemeContext.js
"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // เริ่มต้น state เป็น null ก่อน เพื่อป้องกันปัญหา server/client mismatch
  const [theme, setTheme] = useState(null);

  // useEffect นี้จะทำงาน "บนฝั่ง Client เท่านั้น" หลังจากที่ component โหลดเสร็จ
  useEffect(() => {
    // ตรวจสอบ Theme ที่เคยบันทึกไว้ใน localStorage
    const savedTheme = localStorage.getItem('theme');
    // ตรวจสอบว่าผู้ใช้ตั้งค่า OS เป็น Dark Mode หรือไม่
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // ถ้าไม่มีค่าที่เคยบันทึกไว้ ให้ใช้ค่าจาก OS แทน
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []); // [] หมายถึงให้รันแค่ครั้งแรกบน client

  // useEffect นี้จะทำงานทุกครั้งที่ theme มีการเปลี่ยนแปลง (หลังจากโหลดครั้งแรกเสร็จ)
  useEffect(() => {
    // ถ้า theme ยังเป็น null (กำลังรอการตรวจสอบครั้งแรก) ก็ไม่ต้องทำอะไร
    if (theme === null) return;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // ป้องกันไม่ให้แสดงผลอะไรเลยจนกว่า theme จะถูกกำหนดค่าบน client แล้ว
  if (theme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};