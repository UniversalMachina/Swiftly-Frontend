// Dashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import AIProgress from './AIProgress';
import SupplierChart from './SupplierChart';
import OutreachTracking from './OutreachTracking';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [expandedCases, setExpandedCases] = useState({});


  useEffect(() => {
    // Initialize the charts after component mounts
    // Fetch cases from the backend
    fetchCases();
  }, []);




  const fetchCases = () => {
    fetch('http://localhost:5000/cases/')
      .then((response) => response.json())
      .then((data) => {
        setCases(data);
      })
      .catch((error) => console.error('Error fetching cases:', error));
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
                                                <th className="p-2 text-left">Phone</th>
                                                <th className="p-2 text-left">Room Available</th>
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
                                                  <td className="p-2 border-b">{apt.phone_number}</td>
                                                  <td className="p-2 border-b">
                                                    {apt.room_available ? 'Yes' : 'No'}
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
      </div>
    </div>

      <div className="flex flex-row gap-6">

      <AIProgress cases={cases} />
   

      <SupplierChart cases={cases} />
        <OutreachTracking cases={cases} />
      </div>
    </div>
  );
};

export default Dashboard;
