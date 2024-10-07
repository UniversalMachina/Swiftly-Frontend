import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const OutreachTracking = () => {
  const [outreachData, setOutreachData] = useState({
    totalEmailsSent: 0,
    totalSuppliersCalled: 0,
    totalPropertiesIdentified: 0,
    avgAiProgress: 0,
  });
  const outreachChartRef = useRef(null);

  useEffect(() => {
    fetchOutreachSummary();
  }, []);

  const fetchOutreachSummary = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/outreach-summary`);
      const data = await response.json();
      setOutreachData({
        totalEmailsSent: data.total_emails_sent,
        totalSuppliersCalled: data.total_suppliers_called,
        totalPropertiesIdentified: data.total_properties_identified,
        avgAiProgress: data.avg_ai_progress,
      });
      updateOutreachChart(data.total_emails_sent, data.total_suppliers_called);
    } catch (error) {
      console.error('Failed to fetch outreach summary', error);
    }
  };

  const updateOutreachChart = (totalEmailsSent, totalSuppliersCalled) => {
    const outreachCtx = document.getElementById('outreach-chart').getContext('2d');

    // Update or create chart
    if (outreachChartRef.current) {
      outreachChartRef.current.data.datasets[0].data = [totalEmailsSent, totalSuppliersCalled];
      outreachChartRef.current.update();
    } else {
      outreachChartRef.current = new Chart(outreachCtx, {
        type: 'bar',
        data: {
          labels: ['Emails Sent', 'Suppliers Called'],
          datasets: [
            {
              data: [totalEmailsSent, totalSuppliersCalled],
              backgroundColor: ['#4f46e5', '#10b981'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Outreach Tracking</h2>
      <div className="outreach-stats flex justify-between mb-4">
        <div>
          <div className="stat-value text-3xl font-semibold text-indigo-600">
            {outreachData.totalEmailsSent}
          </div>
          <div className="stat-label text-gray-500">Emails Sent</div>
        </div>
        <div>
          <div className="stat-value text-3xl font-semibold text-indigo-600">
            {outreachData.totalSuppliersCalled}
          </div>
          <div className="stat-label text-gray-500">Suppliers Called</div>
        </div>
        <div>
          <div className="stat-value text-3xl font-semibold text-indigo-600">
            {outreachData.totalPropertiesIdentified}
          </div>
          <div className="stat-label text-gray-500">Properties Identified</div>
        </div>
        <div>
          <div className="stat-value text-3xl font-semibold text-indigo-600">
            {outreachData.avgAiProgress.toFixed(2)}%
          </div>
          <div className="stat-label text-gray-500">Average AI Progress</div>
        </div>
      </div>
      <div className="chart-container h-52">
        <canvas id="outreach-chart"></canvas>
      </div>
    </div>
  );
};

export default OutreachTracking;
