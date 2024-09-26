// AiProgressCard.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AiProgressCard = ({ aiProgress, resetAIProgress }) => {
  const aiProgressChartRef = useRef(null);

  useEffect(() => {
    initializeChart();
  }, []);

  useEffect(() => {
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.data.labels.push(new Date().toLocaleTimeString());
      aiProgressChartRef.current.data.datasets[0].data.push(aiProgress);
      aiProgressChartRef.current.update();
    }
  }, [aiProgress]);

  const initializeChart = () => {
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

  return (
    <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">AI Progress</h2>
      <div className="progress-bar bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="progress bg-indigo-600 h-full rounded-full"
          style={{ width: `${aiProgress}%` }}
        ></div>
      </div>
      <div className="chart-container h-52">
        <canvas id="ai-progress-chart"></canvas>
      </div>
      <div className="utility-buttons flex justify-between mt-4">
        <button
          className="utility-button bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
          onClick={resetAIProgress}
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
};

export default AiProgressCard;
