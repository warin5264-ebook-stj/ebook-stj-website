// components/widgets/GaugeChart.js
"use client";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GaugeChart = ({ title, value, goal = 100 }) => {
  const percentage = ((value / goal) * 100).toFixed(1);

  const data = {
    datasets: [{
      data: [value, goal > value ? goal - value : 0],
      backgroundColor: [ value >= 90 ? '#28a745' : '#f57c00', '#e9ecef'],
      borderColor: ['#ffffff'],
      borderWidth: 2,
      circumference: 180,
      rotation: 270,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: { formatter: () => '' }
    },
    cutout: '70%',
  };

  const centerTextPlugin = {
      id: 'centerText',
      afterDraw(chart) {
          const {ctx, chartArea: {width, height}} = chart;
          ctx.save();
          ctx.font = `bold ${height/4}px sans-serif`;
          ctx.fillStyle = '#1f2937';
          ctx.textAlign = 'center';
          ctx.fillText(`${percentage}%`, width/2, height*0.9);
          ctx.font = `500 ${height/10}px sans-serif`;
          ctx.fillStyle = '#6b7280';
          ctx.fillText(title, width/2, height*1.2);
          ctx.restore();
      }
  }

  return <Doughnut data={data} options={options} plugins={[centerTextPlugin]}/>;
};

export default GaugeChart;