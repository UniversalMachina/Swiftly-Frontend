// Dashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import AIProgress from './AIProgress';
import SupplierChart from './SupplierChart';
import OutreachTracking from './OutreachTracking';
import IncomingCases from './IncomingCases';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [expandedCases, setExpandedCases] = useState({});


  useEffect(() => {
    // Initialize the charts after component mounts
    // Fetch cases from the backend
    fetchCases();
  }, []);




  const fetchCases = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cases/`)
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
      <IncomingCases
        cases={cases}
        expandedCases={expandedCases}
        toggleExpandCase={toggleExpandCase}
      />
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
