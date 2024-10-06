import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const OutreachTracking = ({ emailsSent, suppliersCalled }) => {
  const outreachChartRef = useRef(null);

  useEffect(() => {
    const outreachCtx = document.getElementById('outreach-chart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (outreachChartRef.current) {
      outreachChartRef.current.destroy();
    }

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

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (outreachChartRef.current) {
        outreachChartRef.current.destroy();
      }
    };
  }, [emailsSent, suppliersCalled]);

  return (
    <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Outreach Tracking</h2>
      <div className="outreach-stats flex justify-between mb-4">
        <div>
          <div id="emails-sent" className="stat-value text-3xl font-semibold text-indigo-600">
            {emailsSent}
          </div>
          <div className="stat-label text-gray-500">Emails Sent</div>
        </div>
        <div>
          <div
            id="suppliers-called"
            className="stat-value text-3xl font-semibold text-indigo-600"
          >
            {suppliersCalled}
          </div>
          <div className="stat-label text-gray-500">Property Owners Called</div>
        </div>
      </div>
      <div className="chart-container h-52">
        <canvas id="outreach-chart"></canvas>
      </div>
    </div>
  );
};

export default OutreachTracking;