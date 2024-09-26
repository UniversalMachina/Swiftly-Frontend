// PropertyInformationCard.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PropertyInformationCard = ({
  databaseSuppliers,
  googleMapsSuppliers,
  resetSuppliers,
}) => {
  const supplierChartRef = useRef(null);

  useEffect(() => {
    initializeChart();
  }, []);

  useEffect(() => {
    if (supplierChartRef.current) {
      supplierChartRef.current.data.datasets[0].data = [
        databaseSuppliers,
        googleMapsSuppliers,
      ];
      supplierChartRef.current.update();
    }
  }, [databaseSuppliers, googleMapsSuppliers]);

  const initializeChart = () => {
    const supplierCtx = document.getElementById('supplier-chart').getContext('2d');
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
  };

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
      <div className="utility-buttons flex justify-between mt-4">
        <button
          className="utility-button bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
          onClick={resetSuppliers}
        >
          Reset Properties
        </button>
      </div>
    </div>
  );
};

export default PropertyInformationCard;
