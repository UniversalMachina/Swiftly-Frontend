// Dashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [expandedCases, setExpandedCases] = useState({});
  const [aiProgress, setAiProgress] = useState(0);
  const [databaseSuppliers, setDatabaseSuppliers] = useState(0);
  const [googleMapsSuppliers, setGoogleMapsSuppliers] = useState(0);
  const [emailsSent, setEmailsSent] = useState(0);
  const [suppliersCalled, setSuppliersCalled] = useState(0);

  const aiProgressChartRef = useRef(null);
  const supplierChartRef = useRef(null);
  const outreachChartRef = useRef(null);

  useEffect(() => {
    // Initialize the charts after component mounts
    initializeCharts();
    // Fetch cases from the backend
    fetchCases();
  }, []);

  useEffect(() => {
    // Update charts whenever cases change
    updateChartsAndStats();
  }, [cases]);

  const initializeCharts = () => {
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

    const supplierCtx = document.getElementById('supplier-chart').getContext('2d');
    supplierChartRef.current = new Chart(supplierCtx, {
      type: 'pie',
      data: {
        labels: ['Database Properties', 'Google Maps Properties'],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ['#4f46e5', '#10b981'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const outreachCtx = document.getElementById('outreach-chart').getContext('2d');
    outreachChartRef.current = new Chart(outreachCtx, {
      type: 'bar',
      data: {
        labels: ['Emails Sent', 'Property Owners Called'],
        datasets: [
          {
            data: [0, 0],
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

  const fetchCases = () => {
    fetch('http://localhost:5000/cases/')
      .then((response) => response.json())
      .then((data) => {
        setCases(data);
      })
      .catch((error) => console.error('Error fetching cases:', error));
  };

  const addNewCase = () => {
    const postalCode = prompt('Enter postal code for the new case:', 'M8 8BW');
    if (postalCode) {
      fetch('http://localhost:5000/cases/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postal_code: postalCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('New case created:', data);
          fetchCases(); // Refresh the cases list
        })
        .catch((error) => console.error('Error creating new case:', error));
    }
  };

  const deleteAllCases = () => {
    if (window.confirm('Are you sure you want to delete all cases?')) {
      fetch('http://localhost:5000/cases/', {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('All cases deleted:', data);
          setCases([]);
          resetAIProgress();
          resetSuppliers();
          resetOutreach();
        })
        .catch((error) => console.error('Error deleting cases:', error));
    }
  };

  const toggleExpandCase = (caseId) => {
    setExpandedCases((prev) => ({
      ...prev,
      [caseId]: !prev[caseId],
    }));
  };

  const updateChartsAndStats = () => {
    // Update AI Progress Chart
    const aiProgressData = [];
    const labels = [];
    cases.forEach((caseItem) => {
      caseItem.inquiries.forEach((inquiry) => {
        labels.push(new Date(inquiry.time).toLocaleTimeString());
        aiProgressData.push(inquiry.ai_progress);
      });
    });
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.data.labels = labels;
      aiProgressChartRef.current.data.datasets[0].data = aiProgressData;
      aiProgressChartRef.current.update();
    }

    // Update Suppliers Chart
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
    if (supplierChartRef.current) {
      supplierChartRef.current.data.datasets[0].data = [dbSuppliers, gmSuppliers];
      supplierChartRef.current.update();
    }

    // Update Outreach Chart
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
    if (outreachChartRef.current) {
      outreachChartRef.current.data.datasets[0].data = [totalEmailsSent, totalSuppliersCalled];
      outreachChartRef.current.update();
    }

    // Update AI Progress Bar
    const totalAiProgress = aiProgressData.reduce((a, b) => a + b, 0);
    const averageAiProgress = aiProgressData.length
      ? totalAiProgress / aiProgressData.length
      : 0;
    setAiProgress(averageAiProgress);
  };

  const resetAIProgress = () => {
    setAiProgress(0);
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.data.labels = [];
      aiProgressChartRef.current.data.datasets[0].data = [];
      aiProgressChartRef.current.update();
    }
  };

  const resetSuppliers = () => {
    setDatabaseSuppliers(0);
    setGoogleMapsSuppliers(0);
    if (supplierChartRef.current) {
      supplierChartRef.current.data.datasets[0].data = [0, 0];
      supplierChartRef.current.update();
    }
  };

  const resetOutreach = () => {
    setEmailsSent(0);
    setSuppliersCalled(0);
    if (outreachChartRef.current) {
      outreachChartRef.current.data.datasets[0].data = [0, 0];
      outreachChartRef.current.update();
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto bg-gray-50 self-stretch w-full">
      <div className="top-row w-full">
        <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">Incoming Cases</h2>
          {/* Scrollable area */}
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Case ID</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <React.Fragment key={caseItem.id}>
                    <tr
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => toggleExpandCase(caseItem.id)}
                    >
                      <td className="p-3 border-b">
                        {new Date(caseItem.time).toLocaleTimeString()}
                      </td>
                      <td className="p-3 border-b">{`Case #${caseItem.id}`}</td>
                      <td className="p-3 border-b">
                        <span
                          className={`status-badge py-1 px-3 rounded-full text-xs ${
                            caseItem.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                    </tr>
                    {expandedCases[caseItem.id] && (
                      <tr>
                        <td className="p-3 border-b bg-gray-50" colSpan={3}>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-indigo-600">Inquiries</h3>
                            {caseItem.inquiries.length > 0 ? (
                              <table className="w-full mt-4 table-auto border-collapse">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="p-3 text-left">Time</th>
                                    <th className="p-3 text-left">Inquiry</th>
                                    <th className="p-3 text-left">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {caseItem.inquiries.map((inquiry) => (
                                    <React.Fragment key={inquiry.id}>
                                      <tr>
                                        <td className="p-3 border-b">
                                          {new Date(inquiry.time).toLocaleTimeString()}
                                        </td>
                                        <td className="p-3 border-b">{inquiry.inquiry_text}</td>
                                        <td className="p-3 border-b">
                                          <span
                                            className={`status-badge py-1 px-3 rounded-full text-xs ${
                                              inquiry.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                            }`}
                                          >
                                            {inquiry.status}
                                          </span>
                                        </td>
                                      </tr>
                                      {inquiry.apartments.length > 0 && (
                                        <tr>
                                          <td colSpan={3}>
                                            {/* Apartments List */}
                                            <h4 className="text-md font-semibold text-indigo-600">
                                              Apartments
                                            </h4>
                                            <table className="w-full mt-2 table-auto border-collapse">
                                              <thead>
                                                <tr className="bg-gray-100">
                                                  <th className="p-2 text-left">Name</th>
                                                  <th className="p-2 text-left">Email</th>
                                                  <th className="p-2 text-left">Pricing</th>
                                                  <th className="p-2 text-left">Address</th>
                                                  <th className="p-2 text-left">Website</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {inquiry.apartments.map((apt) => (
                                                  <tr key={apt.id}>
                                                    <td className="p-2 border-b">{apt.name}</td>
                                                    <td className="p-2 border-b">{apt.email}</td>
                                                    <td className="p-2 border-b">{apt.pricing}</td>
                                                    <td className="p-2 border-b">{apt.address}</td>
                                                    <td className="p-2 border-b">
                                                      <a
                                                        href={apt.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                      >
                                                        {apt.website}
                                                      </a>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p>No inquiries available.</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="utility-buttons flex justify-between mt-4">
            <button
              className="utility-button bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
              onClick={deleteAllCases}
            >
              Delete All Cases
            </button>
            <button
              className="mock-data-button bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500"
              onClick={addNewCase}
            >
              Add New Case
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-6">
        <div className="card bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg flex-1">
          <h2 className="text-xl font-semibold text-indigo-600 mb-4">AI Progress</h2>
          <div className="progress-bar bg-gray-200 rounded-full h-3 mb-4">
            <div
              id="ai-progress-bar"
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
          <div className="utility-buttons flex justify-between mt-4">
            <button
              className="utility-button bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
              onClick={resetOutreach}
            >
              Reset Outreach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
