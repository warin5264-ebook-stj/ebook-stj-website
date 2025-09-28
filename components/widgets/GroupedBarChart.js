// components/widgets/GroupedBarChart.js
"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';

// 1. Import ส่วนประกอบที่จำเป็นทั้งหมด
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 2. ลงทะเบียนส่วนประกอบทั้งหมด
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GroupedBarChart = ({ chartData }) => {
  const data = {
    labels: chartData.items.map(item => item.label),
    datasets: [
      {
        label: 'เป้าหมาย',
        data: chartData.items.map(item => item.target),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'ผลงาน',
        data: chartData.items.map(item => item.result),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: chartData.title 
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar options={options} data={data} />;
};

export default GroupedBarChart;