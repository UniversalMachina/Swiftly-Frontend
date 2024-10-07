import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const AIProgress = () => {
  const [aiProgress, setAiProgress] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const aiProgressChartRef = useRef(null);

  useEffect(() => {
    const fetchAIProgressData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/ai-progress-data`);
        const data = await response.json();
        updateAIProgressChart(data);
      } catch (error) {
        console.error('Error fetching AI progress data:', error);
      }
    };

    fetchAIProgressData();
  }, []);

  const updateAIProgressChart = (data) => {
    const aiProgressCtx = document.getElementById('ai-progress-chart').getContext('2d');
    const aiProgressData = [];
    const labels = [];
    let inquiriesCount = 0;
    let propertiesCount = 0;

    data.forEach((caseItem) => {
      caseItem.inquiries.forEach((inquiry) => {
        labels.push(new Date(inquiry.time).toLocaleTimeString());
        aiProgressData.push(inquiry.ai_progress);
        inquiriesCount++;
        propertiesCount += inquiry.properties_identified;
      });
    });

    // Calculate average AI progress
    const totalAiProgress = aiProgressData.reduce((a, b) => a + b, 0);
    const averageAiProgress = aiProgressData.length
      ? totalAiProgress / aiProgressData.length
      : 0;
    setAiProgress(averageAiProgress);
    setTotalInquiries(inquiriesCount);
    setTotalProperties(propertiesCount);

    // Update or create chart
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.data.labels = labels;
      aiProgressChartRef.current.data.datasets[0].data = aiProgressData;
      aiProgressChartRef.current.update();
    } else {
      aiProgressChartRef.current = new Chart(aiProgressCtx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'AI Progress',
              data: aiProgressData,
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
      <p>Total Inquiries: {totalInquiries}</p>
      <p>Total Properties Identified: {totalProperties}</p>
      <div className="chart-container h-52">
        <canvas id="ai-progress-chart"></canvas>
      </div>
    </div>
  );
};

export default AIProgress;