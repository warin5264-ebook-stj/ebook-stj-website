// components/widgets/BarChart.js
"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 1. Import Plugin
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// 2. ลงทะเบียน Plugin ใหม่
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = ({ chartData }) => {
  const sortedItems = [...chartData.items].sort((a, b) => b.percentage - a.percentage);

  const data = {
    labels: sortedItems.map(item => item.label),
    datasets: [{
      label: 'ร้อยละ',
      data: sortedItems.map(item => item.percentage),
      backgroundColor: '#3e8f42ff',
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        display: false 
      },
      title: { 
        display: true, 
        text: chartData.title,
        font: { size: 20 }
      },
      // 3. เพิ่มการตั้งค่าสำหรับ Datalabels
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value.toLocaleString(), // แสดงตัวเลขพร้อม comma
        font: {
          weight: 'bold',
          size: 14 // ปรับขนาด Font ของตัวเลขบนแท่ง
        },
        color: '#333'
      }
    },
    scales: {
      x: { 
        ticks: { 
          maxRotation: 45, 
          minRotation: 45,
          font: { size: 18 } // (แนะนำ) อาจจะต้องลดขนาด Font แกน X ลงเล็กน้อย
        } 
      },
      y: { 
        beginAtZero: true, 
        title: { 
          display: true, 
          text: chartData.yLabel 
        },
        ticks: {
          font: { size: 18 } // (แนะนำ) อาจจะต้องลดขนาด Font แกน Y ลง
        }
      }
    }
  };

  // 4. เพิ่ม plugins เข้าไปใน Component Bar
  return <Bar options={options} data={data} plugins={[ChartDataLabels]} />;
};

export default BarChart;