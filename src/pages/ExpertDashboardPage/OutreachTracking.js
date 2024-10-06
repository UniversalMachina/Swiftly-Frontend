import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const OutreachTracking = ({ cases }) => {
  const [emailsSent, setEmailsSent] = useState(0);
  const [suppliersCalled, setSuppliersCalled] = useState(0);
  const outreachChartRef = useRef(null);

  useEffect(() => {
    updateOutreachChart();
  }, [cases]);

  const updateOutreachChart = () => {
    const outreachCtx = document.getElementById('outreach-chart').getContext('2d');
    let totalEmailsSent = 0;
    let totalSuppliersCalled = 0;

    cases.forEach((caseItem) => {
      caseItem.inquiries.forEach((inquiry) => {
        totalEmailsSent += inquiry.emails_sent;
        totalSuppliersCalled += inquiry.suppliers_called;
      });
    });

    setEmailsSent(totalEmailsSent);
    setSuppliersCalled(totalSuppliersCalled);

    // Update or create chart
    if (outreachChartRef.current) {
      outreachChartRef.current.data.datasets[0].data = [totalEmailsSent, totalSuppliersCalled];
      outreachChartRef.current.update();
    } else {
      outreachChartRef.current = new Chart(outreachCtx, {
        type: 'bar',
        data: {
          labels: ['Emails Sent', 'Property Owners Called'],
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