import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const SupplierChart = () => {
  const [supplierData, setSupplierData] = useState({
    totalPropertiesIdentified: 0,
    totalSuppliersCalled: 0,
    totalEmailsSent: 0,
  });
  const supplierChartRef = useRef(null);

  useEffect(() => {
    fetchSupplierSummary();
  }, []);

  const fetchSupplierSummary = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/supplier-summary`);
      const data = await response.json();
      setSupplierData({
        totalPropertiesIdentified: data.total_properties_identified,
        totalSuppliersCalled: data.total_suppliers_called,
        totalEmailsSent: data.total_emails_sent,
      });
      updateSupplierChart(data);
    } catch (error) {
      console.error('Failed to fetch supplier summary:', error);
    }
  };

  const updateSupplierChart = (data) => {
    const supplierCtx = document.getElementById('supplier-chart').getContext('2d');

    // Update or create chart
    if (supplierChartRef.current) {
      supplierChartRef.current.data.datasets[0].data = [
        data.totalPropertiesIdentified,
        data.totalSuppliersCalled,
        data.totalEmailsSent,
      ];
      supplierChartRef.current.update();
    } else {
      supplierChartRef.current = new Chart(supplierCtx, {
        type: 'bar',
        data: {
          labels: ['Properties Identified', 'Suppliers Called', 'Emails Sent'],
          datasets: [
            {
              data: [
                data.totalPropertiesIdentified,
                data.totalSuppliersCalled,
                data.totalEmailsSent,
              ],
              backgroundColor: ['#4f46e5', '#10b981', '#f59e0b'],
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
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Supplier Summary</h2>
      <div className="stat-value text-3xl font-semibold text-indigo-600">
        {supplierData.totalPropertiesIdentified}
      </div>
      <div className="stat-label text-gray-500">Properties Identified</div>
      <div className="stat-value text-3xl font-semibold text-indigo-600">
        {supplierData.totalSuppliersCalled}
      </div>
      <div className="stat-label text-gray-500">Suppliers Called</div>
      <div className="stat-value text-3xl font-semibold text-indigo-600">
        {supplierData.totalEmailsSent}
      </div>
      <div className="stat-label text-gray-500">Emails Sent</div>
      <div className="chart-container h-52">
        <canvas id="supplier-chart"></canvas>
      </div>
    </div>
  );
};

export default SupplierChart;
