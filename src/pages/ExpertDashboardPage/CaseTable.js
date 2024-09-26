// CaseTable.js
import React, { useState } from 'react';

const CaseTable = ({ cases, setCases, updateDashboardWithInquiryData }) => {
  const [expandedCases, setExpandedCases] = useState({});

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

  const clearCases = () => {
    setCases([]);
  };

  const toggleExpandCase = (caseId) => {
    setExpandedCases((prev) => ({
      ...prev,
      [caseId]: !prev[caseId],
    }));
  };

  return (
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
  );
};

export default CaseTable;
