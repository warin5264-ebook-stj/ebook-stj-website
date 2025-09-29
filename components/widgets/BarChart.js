// components/widgets/BarChart.js
"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = ({ chartData }) => {
  // --- 1. แยกและเรียงลำดับข้อมูล ---
  const totalItem = chartData.items.find(item => item.label === 'รวม');
  const otherItems = chartData.items.filter(item => item.label !== 'รวม');
  const sortedOtherItems = otherItems.sort((a, b) => b.percentage - a.percentage);
  const finalItems = totalItem ? [...sortedOtherItems, totalItem] : sortedOtherItems;

  // --- 2. สร้างสีตามเงื่อนไข ---
  const backgroundColors = finalItems.map(item => {
    if (item.label === 'รวม') return '#499ff5ff'; // สีเทาสำหรับ "รวม"
    return item.percentage < chartData.goal ? '#ffc107' : '#3e8f42ff'; // เหลือง/เขียว
  });

  const data = {
    labels: finalItems.map(item => item.label),
    datasets: [{
      label: 'ร้อยละ',
      data: finalItems.map(item => item.percentage),
      backgroundColor: backgroundColors,
    }],
  };

  // --- 3. Plugin สำหรับวาดเส้นวัดเกณฑ์ ---
  const goalLinePlugin = {
    id: 'goalLine',
    afterDatasetsDraw(chart) {
      const { ctx, chartArea, scales: { y } } = chart;
      const goalValue = chart.options.plugins.goalLine.value;
      
      if (goalValue !== undefined && goalValue >= y.min && goalValue <= y.max) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 99, 132, 0.7)'; // สีชมพูโปร่งใส
        ctx.lineWidth = 3;
        ctx.moveTo(chartArea.left, y.getPixelForValue(goalValue));
        ctx.lineTo(chartArea.right, y.getPixelForValue(goalValue));
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { 
        display: true, 
        text: chartData.title, 
        font: { size: 18 } 
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: (value) => value.toLocaleString(),
        font: { weight: 'bold', size: 12 },
        color: '#444444ff'
      },
      goalLine: {
        value: chartData.goal
      }
    },
    scales: {
      x: { 
        ticks: { 
          maxRotation: 45, 
          minRotation: 45, 
          font: { size: 12 } 
        } 
      },
      y: { 
        beginAtZero: true, 
        title: { display: true, text: chartData.yLabel }, 
        ticks: { font: { size: 12 } },
        max: 500 // ปรับค่าสูงสุดของแกน Y ตามความเหมาะสม
      }
    }
  };

  return (
    <div>
      <div style={{ height: '500px' }}>
        <Bar options={options} data={data} plugins={[goalLinePlugin]} />
      </div>
      {chartData.source && <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>{chartData.source}</p>}
    </div>
  );
};

export default BarChart;