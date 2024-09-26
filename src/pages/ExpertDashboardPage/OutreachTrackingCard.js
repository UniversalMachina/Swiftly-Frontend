// OutreachTrackingCard.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const OutreachTrackingCard = ({ emailsSent, suppliersCalled, resetOutreach }) => {
  const outreachChartRef = useRef(null);

  useEffect(() => {
    initializeChart();
  }, []);

  useEffect(() => {
    if (outreachChartRef.current) {
      outreachChartRef.current.data.datasets[0].data = [emailsSent, suppliersCalled];
      outreachChartRef.current.update();
    }
  }, [emailsSent, suppliersCalled]);

  const initializeChart = () => {
    const outreachCtx = document.getElementById('outreach-chart').getContext('2d');
    outreachChartRef.current = new Chart(outreachCtx, {
      type: 'bar',
      data: {
        labels: ['Emails Sent', 'Property Owners Called'],
        datasets: [
          {
            data: [emailsSent, suppliersCalled],
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
  };

  return (
    <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Outreach Tracking</h2>
      <div className="outreach-stats flex justify-between mb-4">
        <div>
          <div className="stat-value text-3xl font-semibold text-indigo-600">
            {emailsSent}
          </div>
          <div className="stat-label text-gray-500">Emails Sent</div>
        </div>
        <div>
          <div className="stat-value text-3xl font-semibold text-indigo-600">
            {suppliersCalled}
          </div>
          <div className="stat-label text-gray-500">Property Owners Called</div>
        </div>
      </div>
      <div className="chart-container h-52">
        <canvas id="outreach-chart"></canvas>
      </div>
      <div className="utility-buttons flex justify-between mt-4">
        <button
          className="utility-button bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
          onClick={resetOutreach}
        >
          Reset Outreach
        </button>
      </div>
    </div>
  );
};

export default OutreachTrackingCard;
