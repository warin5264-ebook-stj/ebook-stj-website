// components/widgets/BarChart.js
"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 1. รับ chartData เข้ามาเป็น prop
const BarChart = ({ chartData }) => {
  // 2. ใช้ข้อมูลจาก prop ที่ได้รับมา
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'ผู้ป่วยรายใหม่',
        data: chartData.data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: chartData.title, // 3. ใช้ title จาก prop
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;