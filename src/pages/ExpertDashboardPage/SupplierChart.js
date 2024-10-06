import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const SupplierChart = ({ databaseSuppliers, googleMapsSuppliers }) => {
  const supplierChartRef = useRef(null);

  useEffect(() => {
    const supplierCtx = document.getElementById('supplier-chart').getContext('2d');

    // Destroy the previous chart instance if it exists
    if (supplierChartRef.current) {
      supplierChartRef.current.destroy();
    }

    supplierChartRef.current = new Chart(supplierCtx, {
      type: 'pie',
      data: {
        labels: ['Database Properties', 'Google Maps Properties'],
        datasets: [
          {
            data: [databaseSuppliers, googleMapsSuppliers],
            backgroundColor: ['#4f46e5', '#10b981'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Cleanup function to destroy the chart on component unmount
    return () => {
      if (supplierChartRef.current) {
        supplierChartRef.current.destroy();
      }
    };
  }, [databaseSuppliers, googleMapsSuppliers]);

  return (
    <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Property Information</h2>
      <div className="stat-value text-3xl font-semibold text-indigo-600">
        {databaseSuppliers}
      </div>
      <div className="stat-label text-gray-500">Database Properties</div>
      <div className="stat-value text-3xl font-semibold text-indigo-600">
        {googleMapsSuppliers}
      </div>
      <div className="stat-label text-gray-500">Google Maps Properties</div>
      <div className="chart-container h-52">
        <canvas id="supplier-chart"></canvas>
      </div>
    </div>
  );
};

export default SupplierChart;