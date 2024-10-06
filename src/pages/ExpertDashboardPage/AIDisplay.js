import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const AIDisplay = ({ cases }) => {
  const aiProgressChartRef = useRef(null);
  const [aiProgress, setAiProgress] = useState(0);

  useEffect(() => {
    initializeAIProgressChart();
    updateAIProgressChart();
  }, [cases]);

  const initializeAIProgressChart = () => {
    const aiProgressCtx = document.getElementById('ai-progress-chart').getContext('2d');
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
  };

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

    // Update AI Progress Bar
    const totalAiProgress = aiProgressData.reduce((a, b) => a + b, 0);
    const averageAiProgress = aiProgressData.length
      ? totalAiProgress / aiProgressData.length
      : 0;
    setAiProgress(averageAiProgress);
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

export default AIDisplay;
