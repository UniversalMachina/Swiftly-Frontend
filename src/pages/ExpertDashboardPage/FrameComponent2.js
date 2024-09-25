import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [expandedCases, setExpandedCases] = useState({}); // Track expanded/collapsed state of each case
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
  }, []);

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

  const addMockCase = () => {
    const caseId = Date.now();
    const newCase = {
      caseId,
      time: new Date().toLocaleTimeString(),
      status: 'Pending',
      inquiries: [],
    };
    setCases([newCase, ...cases]);
    addMockInquiry(caseId);
  };

  const addMockInquiry = (caseId) => {
    const inquiries = [
      'Need temporary housing for insurance claimant in downtown area',
      'Looking for short-term rental for family of 4 near schools',
      'Require accessible housing for claimant with mobility issues',
      'Seeking pet-friendly temporary accommodation for 3 months',
      'Emergency housing needed for claimant displaced by fire',
    ];
    const statuses = ['Pending', 'In Progress', 'Completed'];
    const randomInquiry = inquiries[Math.floor(Math.random() * inquiries.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const inquiry = {
      inquiryId: Date.now(),
      time: new Date().toLocaleTimeString(),
      inquiry: randomInquiry,
      status: randomStatus,
      aiProgress: Math.floor(Math.random() * 100),
      propertiesIdentified: Math.floor(Math.random() * 10),
      emailsSent: Math.floor(Math.random() * 5),
      suppliersCalled: Math.floor(Math.random() * 3),
    };

    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.caseId === caseId) {
          return {
            ...c,
            inquiries: [...c.inquiries, inquiry],
          };
        }
        return c;
      })
    );
    updateDashboardWithInquiryData(inquiry);
  };

  const updateDashboardWithInquiryData = (inquiry) => {
    setAiProgress(inquiry.aiProgress);
    if (aiProgressChartRef.current) {
      aiProgressChartRef.current.data.labels.push(new Date().toLocaleTimeString());
      aiProgressChartRef.current.data.datasets[0].data.push(inquiry.aiProgress);
      aiProgressChartRef.current.update();
    }

    setDatabaseSuppliers((prev) => prev + inquiry.propertiesIdentified);
    setGoogleMapsSuppliers((prev) => prev + inquiry.propertiesIdentified);
    if (supplierChartRef.current) {
      supplierChartRef.current.data.datasets[0].data = [databaseSuppliers, googleMapsSuppliers];
      supplierChartRef.current.update();
    }

    setEmailsSent((prev) => prev + inquiry.emailsSent);
    setSuppliersCalled((prev) => prev + inquiry.suppliersCalled);
    if (outreachChartRef.current) {
      outreachChartRef.current.data.datasets[0].data = [emailsSent, suppliersCalled];
      outreachChartRef.current.update();
    }
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

  const clearCases = () => {
    setCases([]);
    resetAIProgress();
    resetSuppliers();
    resetOutreach();
  };

  const toggleExpandCase = (caseId) => {
    setExpandedCases((prev) => ({
      ...prev,
      [caseId]: !prev[caseId],
    }));
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
                  <React.Fragment key={caseItem.caseId}>
                    <tr
                      className="cursor-pointer hover:bg-gray-200"
                      onClick={() => toggleExpandCase(caseItem.caseId)}
                    >
                      <td className="p-3 border-b">{caseItem.time}</td>
                      <td className="p-3 border-b">{`Case #${caseItem.caseId}`}</td>
                      <td className="p-3 border-b">
                        <span className="status-badge bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-xs">
                          {caseItem.status}
                        </span>
                      </td>
                    </tr>
                    {expandedCases[caseItem.caseId] && (
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
                                    <tr key={inquiry.inquiryId}>
                                      <td className="p-3 border-b">{inquiry.time}</td>
                                      <td className="p-3 border-b">{inquiry.inquiry}</td>
                                      <td className="p-3 border-b">
                                        <span
                                          className={`status-badge bg-${
                                            inquiry.status === 'Completed' ? 'green' : 'blue'
                                          }-100 text-${
                                            inquiry.status === 'Completed' ? 'green' : 'blue'
                                          }-800 py-1 px-3 rounded-full text-xs`}
                                        >
                                          {inquiry.status}
                                        </span>
                                      </td>
                                    </tr>
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
              onClick={clearCases}
            >
              Clear All
            </button>
            <button
              className="mock-data-button bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-500"
              onClick={addMockCase}
            >
              Add Mock Case
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
