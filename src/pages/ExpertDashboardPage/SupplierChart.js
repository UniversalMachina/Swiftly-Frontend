import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const SupplierChart = ({ cases }) => {
  const [databaseSuppliers, setDatabaseSuppliers] = useState(0);
  const [googleMapsSuppliers, setGoogleMapsSuppliers] = useState(0);
  const supplierChartRef = useRef(null);

  useEffect(() => {
    updateSupplierChart();
  }, [cases]);

  const updateSupplierChart = () => {
    const supplierCtx = document.getElementById('supplier-chart').getContext('2d');
    let dbSuppliers = 0;
    let gmSuppliers = 0;

    cases.forEach((caseItem) => {
      caseItem.inquiries.forEach((inquiry) => {
        dbSuppliers += inquiry.properties_identified; // Adjust based on your data
        gmSuppliers += inquiry.properties_identified; // Adjust accordingly
      });
    });

    setDatabaseSuppliers(dbSuppliers);
    setGoogleMapsSuppliers(gmSuppliers);

    // Update or create chart
    if (supplierChartRef.current) {
      supplierChartRef.current.data.datasets[0].data = [dbSuppliers, gmSuppliers];
      supplierChartRef.current.update();
    } else {
      supplierChartRef.current = new Chart(supplierCtx, {
        type: 'pie',
        data: {
          labels: ['Database Properties', 'Google Maps Properties'],
          datasets: [
            {
              data: [dbSuppliers, gmSuppliers],
              backgroundColor: ['#4f46e5', '#10b981'],
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