import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const AIProgress = ({ aiProgress, cases }) => {
  const aiProgressChartRef = useRef(null);

  useEffect(() => {
    const aiProgressCtx = document.getElementById('ai-progress-chart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.destroy();
    }

    aiProgressChartRef.current = new Chart(aiProgressCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'AI Progress',
            data: [],
            borderColor: '#4f46e5',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    updateAIProgressChart();

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (aiProgressChartRef.current) {
        aiProgressChartRef.current.destroy();
      }
    };
  }, [cases]);

  const updateAIProgressChart = () => {
    const aiProgressData = [];
    const labels = [];
    cases.forEach((caseItem) => {
      caseItem.inquiries.forEach((inquiry) => {
        labels.push(new Date(inquiry.time).toLocaleTimeString());
        aiProgressData.push(inquiry.ai_progress);
      });
    });
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.data.labels = labels;
      aiProgressChartRef.current.data.datasets[0].data = aiProgressData;
      aiProgressChartRef.current.update();
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">AI Progress</h2>
      <div className="progress-bar bg-gray-200 rounded-full h-3 mb-4">
        <div
          id="ai-progress-bar"
          className="progress bg-indigo-600 h-full rounded-full"
          style={{ width: `${aiProgress}%` }}
        ></div>
      </div>
      <div className="chart-container h-52">
        <canvas id="ai-progress-chart"></canvas>
      </div>
    </div>
  );
};

export default AIProgress;