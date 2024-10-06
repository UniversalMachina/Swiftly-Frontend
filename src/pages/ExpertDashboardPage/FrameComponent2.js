import React, { useState, useEffect } from 'react';
import AIDisplay from './AIDisplay';
import SupplierInfoDisplay from './SupplierInfoDisplay';
import OutreachDisplay from './OutreachDisplay';
import IncomingCasesDisplay from './IncomingCasesDisplay'; // Import the new component

const Dashboard = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = () => {
    fetch('http://localhost:5000/cases/')
      .then((response) => response.json())
      .then((data) => setCases(data))
      .catch((error) => console.error('Error fetching cases:', error));
  };

  return (
    <div className="flex flex-col gap-6 p-8 max-w-[1600px] mx-auto bg-gray-50 self-stretch w-full">
      {/* Incoming Cases at the top */}
      <IncomingCasesDisplay cases={cases} />

      {/* Wrap AI, Supplier, and Outreach in a flex-row div */}
      <div className="flex flex-row gap-6">
        <AIDisplay cases={cases} />               {/* AI Progress Display */}
        <SupplierInfoDisplay cases={cases} />     {/* Supplier Info Display */}
        <OutreachDisplay cases={cases} />         {/* Outreach Display */}
      </div>
    </div>
  );
};

export default Dashboard;
